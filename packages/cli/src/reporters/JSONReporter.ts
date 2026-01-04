import { AnalysisResult } from '@codeblaster/core';

export class JSONReporter {
  generate(result: AnalysisResult): string {
    return JSON.stringify(result, null, 2);
  }
}
