import AIProvider, { AIAnalysisRequest, AIAnalysisResponse } from './AIProvider';
import { AIProviderConfig } from '../types';

export interface ConsensusConfig {
  providers: AIProviderConfig[];
  votingStrategy: 'majority' | 'unanimous' | 'weighted';
  minConfidence: number;
  weights?: Record<string, number>; // provider -> weight
}

export class MultiModelConsensus {
  private providers: AIProvider[];
  private config: ConsensusConfig;

  constructor(config: ConsensusConfig) {
    this.config = config;
    this.providers = config.providers.map((cfg) => new AIProvider(cfg));
  }

  async analyzeWithConsensus(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    console.log(`🤖 Running multi-model consensus with ${this.providers.length} models...`);

    // Run all models in parallel
    const results = await Promise.all(
      this.providers.map((provider, idx) => 
        this.runProviderWithTimeout(provider, request, idx)
      )
    );

    // Filter successful results
    const validResults = results.filter((r) => r !== null) as AIAnalysisResponse[];

    if (validResults.length === 0) {
      throw new Error('All AI providers failed');
    }

    // Merge results based on voting strategy
    return this.mergeResults(validResults);
  }

  private async runProviderWithTimeout(
    provider: AIProvider,
    request: AIAnalysisRequest,
    idx: number
  ): Promise<AIAnalysisResponse | null> {
    try {
      console.log(`  Model ${idx + 1}: Analyzing...`);
      const result = await Promise.race([
        provider.analyzeCode(request),
        this.timeout(30000), // 30s timeout
      ]);
      console.log(`  Model ${idx + 1}: ✅ Complete`);
      return result;
    } catch (error) {
      console.warn(`  Model ${idx + 1}: ❌ Failed -`, error);
      return null;
    }
  }

  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    );
  }

  private mergeResults(results: AIAnalysisResponse[]): AIAnalysisResponse {
    const allIssues = results.flatMap((r) => r.issues);
    
    // Group similar issues
    const issueGroups = this.groupSimilarIssues(allIssues);

    // Apply voting strategy
    const consensusIssues = issueGroups
      .map((group) => this.applyVoting(group, results.length))
      .filter((issue) => issue !== null);

    // Merge summaries
    const allSummaries = results.map((r) => r.summary).join('\n\n---\n\n');
    const allImprovements = [...new Set(results.flatMap((r) => r.improvements))];

    return {
      issues: consensusIssues,
      summary: `Multi-Model Consensus Analysis (${results.length} models)\n\n${allSummaries}`,
      improvements: allImprovements,
    };
  }

  private groupSimilarIssues(issues: any[]): any[][] {
    const groups: any[][] = [];

    issues.forEach((issue) => {
      // Find existing group with similar issue
      const existingGroup = groups.find((group) =>
        this.isSimilarIssue(issue, group[0])
      );

      if (existingGroup) {
        existingGroup.push(issue);
      } else {
        groups.push([issue]);
      }
    });

    return groups;
  }

  private isSimilarIssue(issue1: any, issue2: any): boolean {
    // Issues are similar if:
    // 1. Same line number (±2 lines)
    // 2. Same category
    // 3. Similar message (fuzzy match)
    
    const lineDiff = Math.abs(issue1.line - issue2.line);
    const sameCategory = issue1.category === issue2.category;
    const similarMessage = this.fuzzyMatch(issue1.message, issue2.message) > 0.7;

    return lineDiff <= 2 && sameCategory && similarMessage;
  }

  private fuzzyMatch(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  private applyVoting(issueGroup: any[], totalModels: number): any {
    const voteCount = issueGroup.length;
    const votePercentage = voteCount / totalModels;

    // Apply voting strategy
    switch (this.config.votingStrategy) {
      case 'unanimous':
        if (voteCount < totalModels) return null;
        break;
      case 'majority':
        if (votePercentage < 0.5) return null;
        break;
      case 'weighted':
        // Implement weighted voting if needed
        break;
    }

    // Average confidence from all votes
    const avgConfidence = issueGroup.reduce((sum, i) => sum + i.confidence, 0) / voteCount;

    if (avgConfidence < this.config.minConfidence) {
      return null;
    }

    // Return the issue with highest confidence
    const bestIssue = issueGroup.reduce((best, current) =>
      current.confidence > best.confidence ? current : best
    );

    return {
      ...bestIssue,
      confidence: Math.round(avgConfidence),
      votes: voteCount,
      consensus: `${voteCount}/${totalModels} models agree`,
    };
  }
}

export default MultiModelConsensus;
