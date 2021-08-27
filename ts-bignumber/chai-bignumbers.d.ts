/// <reference types="chai" />

// This enables the typescript for chai bignumbers

declare module "chai-bignumber" {
  function chaiBignumber(bignumber: any): (chai: any, utils: any) => void;

  namespace chaiBignumber {

  }

  export = chaiBignumber;
}

declare namespace Chai {
  // For BDD API
  interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
    bignumber: Assertion;
    lessThan: (v: any, message?: string) => Assertion;
    lessThanOrEqual: (v: any, message?: string) => Assertion;
    greaterThanOrEqual: (v: any, message?: string) => Assertion;
  }
}