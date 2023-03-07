// @unocss-include

import { Tool } from "./types";
import { translator } from "./translator";
import { weekly_report } from "./weekly_report";
import { okr_generator } from "./okr_generator";
import { coding_function } from "./coding_function";
import { finding_bugs } from "./finding_bugs";
import { redbook } from "./redbook";
import { frontend_helper } from "./frontend_helper";

export default function getTool(t?: any): Tool[] {
  if (!t) {
    t = (r: any) => r;
  }
  return [
    weekly_report(t),
    translator(t),
    okr_generator(t),
    coding_function(t),
    finding_bugs(t),
    redbook(t),
    frontend_helper(t)
  ];
}
