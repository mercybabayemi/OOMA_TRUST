
#[test_only]
module sui_move_will_contract::sui_move_will_contract_tests{
    use sui_move_will_contract::will_contract;

    const ENotImplemented: u64 = 0;

    // #[test]
    // fun test_sui_move_will_contract() {
        
    // }


    #[test_only]
    fun test_create_assets(){
        let ctx = sui::tx_context::dummy();
        assert!(ctx.get_ids_created() == 0);

        let asset = will_contract::create_asset(
            "House".to_string(),
            "Family House".to_string(),
            "http://example.com/house_proof".to_string(),
            &sui::clock::dummy(),
            500000u128,
            &mut ctx
        );
        assert!(ctx.get_ids_created() == 1);
    }


    #[test, expected_failure(abort_code = ::sui_move_will_contract::sui_move_will_contract_tests::ENotImplemented)]
    fun test_sui_move_will_contract_fail() {
        abort ENotImplemented
    }

}