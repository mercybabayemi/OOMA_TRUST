/*
/// Module: sui_move_will_contract
module sui_move_will_contract::sui_move_will_contract;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions
#[allow(duplicate_alias, unused_use, lint(self_transfer))]
module sui_move_will_contract::will_contract {


    use sui::object::{UID, ID};
    use sui::tx_context::{TxContext};
    use sui::transfer::{public_transfer, transfer};
    use sui::clock::{Clock, timestamp_ms};
    use std::string::{String, append};
    use std::u128;
    use std::vector::push_back;
    use sui::table::{Table,borrow_mut};
    use std::address;
    use sui::sui;



    ///Will constant Types
    const STATUS_ACTIVE_BYTES: vector<u8> = b"ACTIVE";
    const STATUS_REVOKED_BYTES: vector<u8> = b"REVOKED";
    const WILL_PARTIES_TYPE_BENEFICIARY: vector<u8> = b"Beneficiary";
    const WILL_PARTIES_TYPE_WITNESS: vector<u8> = b"Witness";
    const WILL_PARTIES_TYPE_LAWYER: vector<u8> = b"Lawyer";



    /// Will contract for managing wills, assets, and will parties as witnesses or beneficiaries.
    ///User indicates asset or collection of assets before will creation. 
    
    /// Asset Structure
    public struct Asset has key, store {
        id: UID,
        testator: address,
        asset_type: String,
        description: String,
        document_proof_url: String,
        created_date: u64,
        value: u128,
        status: String
    }

    /// Asset functions
    public fun create_asset(inserted_asset_type: String, inserted_description: String, inserted_proof_url: String, inserted_value:u128, ctx: &mut TxContext): (ID, String) {
        let asset = Asset {
            id: object::new(ctx),
            testator: tx_context::sender(ctx),
            asset_type: inserted_asset_type,
            description: inserted_description,
            document_proof_url: inserted_proof_url,
            created_date: ctx.epoch_timestamp_ms(),
            value : inserted_value,
            status: STATUS_ACTIVE_BYTES.to_string()
        };
        let asset_id = object::id(&asset);
        transfer::transfer(asset, tx_context::sender(ctx));
        (asset_id, b"Asset created successfully.".to_string())
    }
   
    public fun update_asset(asset: &mut Asset, new_asset_type: String, new_description: String, new_proof_url: String, new_value: u128, ctx: &mut TxContext ): (&Asset, String){
        let asset = asset;
        asset.asset_type = new_asset_type;
        asset.description = new_description;
        asset.document_proof_url = new_proof_url;
        asset.created_date = ctx.epoch_timestamp_ms();
        asset.value= new_value;
        (asset, b"Asset updated successfully.".to_string())
    }

    public fun verify_asset_owner(asset: &Asset, owner: address): bool{
        // Check if the asset belongs to the specified owner
        asset.testator == owner
    }

    public struct AssetManager has key{
        id: UID,
        assets: Table<ID, Asset>,
    }

    ///fetch mutable reference to asset
    public fun borrow_asset(manager: &mut AssetManager, asset_id: ID, owner: address): &mut Asset {
        // Borrow a mutable reference to the asset from the asset manager
        let asset = borrow_mut(&mut manager.assets, asset_id);
        assert!(asset.testator == owner, 0);
        asset
    }

    public fun revoke_asset(asset: &mut Asset, ctx: &mut TxContext): (&mut Asset, String) {
        // Mark the asset as invalid
        asset.status = STATUS_REVOKED_BYTES.to_string();
        asset.created_date = ctx.epoch_timestamp_ms();
        (asset, b"Asset invalidated successfully.".to_string())
    }

    ///Witness, Lawyer and Beneficiary Structure
    public struct WillParties has key, store{
        id: UID,
        user_name: String,
        user_signature: String,
        user_signature_type: String,
        created_date: u64,
        phone_number: String,
        email: String,
        user_role: String, // e.g., "Beneficiary", "Witness", "Lawyyer"
    }


    ///Create Beneficiary 
    public fun create_beneficiary(user_name: String, user_signature: String, user_signature_type: String, phone_number: String, email: String, ctx: &mut TxContext): (ID, String) {
        let beneficiary = WillParties {
            id: object::new(ctx),
            user_name,
            user_signature,
            user_signature_type,
            created_date: ctx.epoch_timestamp_ms(),
            phone_number,
            email,
            user_role: WILL_PARTIES_TYPE_BENEFICIARY.to_string()
        };
        let beneficiary_id = object::id(&beneficiary);
        transfer::transfer(beneficiary, tx_context::sender(ctx));
        (beneficiary_id, b"Beneficiary created successfully.".to_string())
    }

    ///Create Witness
    public fun create_witness(user_name: String, user_signature: String, user_signature_type: String, phone_number: String, email: String, ctx: &mut TxContext): (ID, String) {
        let witness = WillParties {
            id: object::new(ctx),
            user_name,
            user_signature,
            user_signature_type,
            created_date: ctx.epoch_timestamp_ms(),
            phone_number,
            email,
            user_role: WILL_PARTIES_TYPE_WITNESS.to_string()
        };
        let witness_id = object::id(&witness);
        transfer::transfer(witness, tx_context::sender(ctx));
        (witness_id, b"Witness created successfully.".to_string())
    }

    ///Create Lawyer
    public fun create_lawyer(user_name: String, user_signature: String, user_signature_type: String, phone_number: String, email: String, ctx: &mut TxContext): (ID, String) {
        let lawyer = WillParties {
            id: object::new(ctx),
            user_name,
            user_signature,
            user_signature_type,
            created_date: ctx.epoch_timestamp_ms(),
            phone_number,
            email,
            user_role: WILL_PARTIES_TYPE_LAWYER.to_string()
        };
        let lawyer_id = object::id(&lawyer);
        transfer::transfer(lawyer, tx_context::sender(ctx));
        (lawyer_id, b"Lawyer created successfully.".to_string())
    }

    ///Will Structure➜  sui_move_will_contract git:(main) ✗ sui client ptb --move-call 0xfe0d667ce4312a85cf83f014beb3c595bf3ce17a22ef7f2bb47d8206fe76c468::will_contract::create_will --make-move-vec <ID> [0xab4196ed139543f5c47b0754bb2259812d6f1d5b81897db87514142bebf0780a] true --make-move-vec <ID> ["Give all of my children"] "Family home"' '"ipfs://test123"' 10000
    public struct Will has key, store {
        id: UID,
        testator: address,
        assets: vector<ID>,
        created_date: u64,
        status: String,
        lawyer_id: ID,
        legal_validation: bool,
        beneficiaries: vector<ID>,
        witnesses: vector<ID>,
        instructions: vector<String>,
        version_history: vector<String>,
        testator_digital_signature: String,
        testator_digital_signature_type: String
    }

    ///Will functions
    public fun create_will(inserted_assets: vector<ID>, inserted_lawyer: ID, inserted_legal_validation: bool, inserted_instructions: vector<String>, inserted_beneficiaries:vector<ID>, inserted_witness:vector<ID>, created_digital_signature: String, created_digital_signature_type: String, ctx: &mut TxContext):(ID, String){
        let will: Will = Will{
            id: object::new(ctx),
            testator: tx_context::sender(ctx),
            assets: inserted_assets,
            created_date: ctx.epoch_timestamp_ms(),
            status: STATUS_ACTIVE_BYTES.to_string(),
            lawyer_id: inserted_lawyer,
            legal_validation: inserted_legal_validation,
            beneficiaries: inserted_beneficiaries,
            witnesses: inserted_witness,
            instructions: inserted_instructions,
            version_history: vector[],
            testator_digital_signature: created_digital_signature,
            testator_digital_signature_type: created_digital_signature_type
        };
        let will_id = object::id(&will);
        transfer::transfer(will, tx_context::sender(ctx));
        (will_id, b"Will created successfully.".to_string())
    }

    public fun update_will(will: &mut Will, new_assets: ID, new_legal_validation: bool, new_instructions: String, new_beneficiaries: ID, new_witnesses: ID, created_digital_signature: String, created_digital_signature_type: String, ctx: &mut TxContext ): (&Will, String) {
        let will = will;
        push_back(&mut will.assets, new_assets);
        will.legal_validation = new_legal_validation;
        will.created_date = ctx.epoch_timestamp_ms();
        push_back(&mut will.beneficiaries, new_beneficiaries);
        push_back(&mut will.witnesses, new_witnesses);
        push_back(&mut will.instructions, new_instructions);
        // push_back(&mut will.instructions, new_instructions);
        // will.beneficiaries = new_beneficiaries;
        // will.witnesses = new_witnesses;
        will.testator_digital_signature = created_digital_signature;
        will.testator_digital_signature_type = created_digital_signature_type;

        let mut updated_on = b"updated on ".to_string();
        let created_clock = ctx.epoch_timestamp_ms().to_string();
        append(&mut updated_on, created_clock);
        push_back(&mut will.version_history, updated_on);
        (will, b"Will updated successfully.".to_string())
    }

    /// The main entry point for the contract.
    public fun main(): String {
        // Initialize the contract state or perform any setup required.
        // This is a placeholder for the actual implementation.
        b"Sui Move Will Contract initialized successfully.".to_string()
    }
} 