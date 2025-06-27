
#[test_only]
#[allow(duplicate_alias, unused_use, unused_variable, unused_const )]
module sui_move_will_contract::will_contract_tests{
    use sui_move_will_contract::will_contract;
    use sui::test_scenario;
    use sui::clock;
    use sui::tx_context;
    use sui::clock::create_for_testing;
    use sui::test_scenario::end;
    use sui_move_will_contract::will_contract::AssetManager;

    const TEST_ASSET_TYPE: vector<u8> = b"House";
    const TEST_DESCRIPTION: vector<u8> = b"Family home";
    const TEST_PROOF_URL: vector<u8> = b"ipfs://test123";
    const TEST_USER_NAME: vector<u8> = b"Alice";
    const TEST_SIGNATURE: vector<u8> = b"sig123";
    const TEST_SIGNATURE_TYPE: vector<u8> = b"NIN";
    const TEST_PHONE: vector<u8> = b"+123456789";
    const TEST_EMAIL: vector<u8> = b"alice@example.com";
    const TEST_INSTRUCTION: vector<u8> = b"Divide equally";
    const TEST_TESTATOR_DIGITAL_SIGNATURE: vector<u8> = b"sign456";
    const TEST_TESTATOR_DIGITAL_SIGNATURE_TYPE: vector<u8> = b"BVN";

    #[test]
    fun test_asset_lifecycle(){
        // let mut scenario = test_scenario::begin(@0x123);
        // let ctx = test_scenario::ctx(&mut scenario);

        let scenario_num = @0x123;
        let mut scenario = test_scenario::begin(scenario_num);

        let ctx = test_scenario::ctx( &mut scenario);

        //Test asset creation
        let (asset_id, create_msg) = will_contract::create_asset(
            TEST_ASSET_TYPE.to_string(),
            TEST_DESCRIPTION.to_string(),
            TEST_PROOF_URL.to_string(),
            100000000,
            ctx
        );
        assert!(create_msg == b"Asset created successfully.".to_string(), 0);

        test_scenario::end(scenario);
    }
}