import { CalculationMethod, CalculationMethodKey } from "./enums";
import { Macros } from "./macros";

export class PlanInfo {
  created!: Date;
  protein!: number;
  fat!: number;
  carbs!: number;
  days!: number;
  calculationMethod!: CalculationMethod;

  constructor() {
    this.created = new Date();
  }

  get macros(): Macros {
    return new Macros(this.protein, this.fat, this.carbs);
  }

  get calories(): number {
    return this.macros.calories;
  }

  get currentDay(): number {
    const date = this.created;
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const differenceInDays = Math.floor((todayStart.getTime() - dateStart.getTime()) / oneDay);
    return Math.min(differenceInDays, this.days - 1);
  }

  // TODO get percentages()

  toJson(): string {
    return JSON.stringify({
      created: this.created,
      protein: this.protein,
      fat: this.fat,
      carbs: this.carbs,
      days: this.days,
      calculationMethod: this.calculationMethod.valueOf(),
    });
  }

  static fromJson(json: any): PlanInfo {
    if (!json) {
      throw new Error("Invalid JSON");
    }
    const plan = new PlanInfo();
    plan.created = new Date(json.created);
    plan.protein = json.protein;
    plan.fat = json.fat;
    plan.carbs = json.carbs;
    plan.days = json.days;
    plan.calculationMethod = CalculationMethod[json.calculationMethod as CalculationMethodKey];
    return plan;
  }

  static default() {
    const planInfo = new PlanInfo();
    planInfo.calculationMethod = CalculationMethod.ALL;
    planInfo.protein = 110;
    planInfo.fat = 105;
    planInfo.carbs = 100;
    planInfo.days = 1;
    return planInfo;
  }
}
