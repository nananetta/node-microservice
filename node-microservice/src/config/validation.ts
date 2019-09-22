'use strict';

/**
 * Module dependencies.
 */

/**
 * Module init function.
 */
export const VALIDATION = {
    /**
     * ecommerce
     */
    ecommerce: {
        /**
         * get-product
         */
        'get-product': {
            type: 'OBJECT',
            parameters: {
                genderCd: {
                    type: 'STRING',
                    mandatory: true
                },
                dob: {
                    type: 'DATE',
                    mandatory: true
                },
                planCode: {
                    type: 'STRING',
                    mandatory: true
                },
                premiumPerYear: {
                    type: 'NUMBER',
                    mandatory: true
                },
                paymentFrequency: {
                    type: 'STRING'
                }
            }
        }
    },

    /**
     * nextgen
     */
    nextgen: {
        /**
         * calculate-premium
         */
        'calculate-premium': {
            type: 'OBJECT',
            mandatory: true,
            parameters: {
                planCode: {
                    type: 'STRING',
                    mandatory: true,
                    customValidation: {
                        validation: 'input.length > 0',
                        error: 'cannot be empty'
                    }
                },
                genderCd: {
                    type: 'STRING',
                    mandatory: true,
                    customValidation: {
                        validation: '["MALE", "FEMALE"].indexOf(input) > -1',
                        error: 'can only have values [MALE, FEMALE]'
                    }
                },
                premium: {
                    type: 'LIST',
                    parameters: {
                        LISTOBJECT: {
                            type: 'NUMBER',
                            customValidation: {
                                validation: 'input >= 10000',
                                error: 'cannot be less than 10,000'
                            }
                        }
                    }
                },
                dob: {
                    type: 'DATE',
                    mandatory: true
                },
                sumAssured: {
                    type: 'LIST',
                    parameters: {
                        LISTOBJECT: {
                            type: 'NUMBER',
                            customValidation: {
                                validation: 'input >= 50000',
                                error: 'cannot be less than 50,000'
                            }
                        }
                    }
                },
                party: {
                    type: 'OBJECT',
                    parameters: {
                        age: {
                            type: 'NUMBER'
                        }
                    }
                }
            }
        }
    },

    /**
     * smartplus2
     */
    smartplus2: {
        /**
         * lead
         */
        lead: {
            type: 'OBJECT',
            mandatory: true,
            parameters: {
                name: {
                    type: 'STRING',
                    mandatory: true,
                    customValidation: {
                        validation: 'input.length > 0',
                        error: 'cannot be empty'
                    }
                },
                surname: {
                    type: 'STRING',
                    mandatory: true,
                    customValidation: {
                        validation: 'input.length > 0',
                        error: 'cannot be empty'
                    }
                },
                email: {
                    type: 'STRING',
                    mandatory: true,
                    customValidation: {
                        validation: 'input.length > 0',
                        error: 'cannot be empty'
                    }
                },
                phone: {
                    type: 'STRING',
                    mandatory: true,
                    customValidation: {
                        validation: 'input.length > 0',
                        error: 'cannot be empty'
                    }
                },
                age: {
                    type: 'NUMBER',
                    customValidation: {
                        validation: 'input >= 0 && input <= 100',
                        error: 'should be between 0 and 100'
                    }
                },
                dob: {
                    type: 'DATE'
                }
            }
        }
    }
};
