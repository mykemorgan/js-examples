
describe('Cart mapper tests', () => {
    before((done) => {
        done();
    });

    after((done) => {
        console.log('\n[30;41mXXX/mm remove the .only() wrapper from the test suite!!![0m');
        done();
    });

    describe.only('Full Cart creation tests', () => {
        it('maps WPS to Cart - empty', async (done) => {
            var params = {};
            var expected = {
                intent: 'sale'
            };
            try {
                const mapped_cart = await mapCartParams(params);
                assert.deepEqual(mapped_cart, expected, 'Empty WPS params has only default sale intent');
                // String interpolation: ES6 will insert value of any visible variable using
                // back-ticks and the below syntax:
                assert.deepEqual(mapped_cart, expected, `email ${ctx.city} and address properties should be set from wps`);
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});

// WPS parameters related to cart creation.
// XXX/mm Testing the "is this a WPS valid parameter" test.
export const WPS_CART_VARS = {
    // intent - TODO/mm this is not documented. Is it an actual WPS parameter to map?
    PAYMENT_ACTION: 'paymentaction',

    // redirect_urls
    CANCEL_RETURN: 'cancel_return',
    RETURN: 'return',

    FOO1: 'amount_123',
    FOO2: 'amount_7',
    FOO3: 'discount_amount_3',
    FOO4: 'discount_amount_36',
    FOO5: 'fallback_shipping_option_amount_6',
    FOO6: 'fallback_shipping_option_name_0',
    FOO7: 'fallback_shipping_option_is_default_4',

    FOO8: 'height_5',
    FOO9: 'height_567',
    FOO10: 'length_5',
    FOO11: 'length_567',
    FOO12: 'width_5',
    FOO13: 'width_567',
    OS1: 'option_select566_name',
    OS2: 'option_select566_type',
    OS3: 'option_select566_am',
    OS4: 'option_select566_pm',
    OS5: 'option_select566_tm',
    OS6: 'option_select566_nm',

    FAIL1: 'option_select566asdf',


    LAST: 'return'
};
