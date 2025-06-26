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



    ///Will constant Types
    const STATUS_ACTIVE_BYTES: vector<u8> = b"ACTIVE";
    const STATUS_REVOKED_BYTES: vector<u8> = b"REVOKED";
    const WILL_PARTIES_TYPE_BENEFICIARY: vector<u8> = b"Beneficiary";
    const WILL_PARTIES_TYPE_WITNESS: vector<u8> = b"Witness";



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
    public fun create_asset(inserted_asset_type: String, inserted_description: String, inserted_proof_url: String, clock: &Clock, inserted_value:u128, ctx: &mut TxContext): (ID, String) {
        let asset = Asset {
            id: object::new(ctx),
            testator: tx_context::sender(ctx),
            asset_type: inserted_asset_type,
            description: inserted_description,
            document_proof_url: inserted_proof_url,
            created_date: timestamp_ms(clock),
            value : inserted_value,
            status: STATUS_ACTIVE_BYTES.to_string()
        };
        let asset_id = object::id(&asset);
        transfer::transfer(asset, tx_context::sender(ctx));
        (asset_id, b"Asset created successfully.".to_string())
    }
   
    public fun update_asset(asset: &mut Asset, new_asset_type: String, new_description: String, new_proof_url: String, new_clock: &Clock, new_value: u128): (&Asset, String){
        let asset = asset;
        asset.asset_type = new_asset_type;
        asset.description = new_description;
        asset.document_proof_url = new_proof_url;
        asset.created_date = timestamp_ms(new_clock);
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
        let asset = sui::table::borrow_mut(&mut manager.assets, asset_id);
        assert!(asset.testator == owner, 0);
        asset
    }

    public fun revoke_asset(asset: &mut Asset, clock: &Clock): (&mut Asset, String) {
        // Mark the asset as invalid
        asset.status = STATUS_REVOKED_BYTES.to_string();
        asset.created_date = timestamp_ms(clock);
        (asset, b"Asset invalidated successfully.".to_string())
    }

    ///Witness and Beneficiary Structure
    public struct WillParties has key, store{
        id: UID,
        user_name: String,
        user_signature: String,
        created_date: u64,
        phone_number: String,
        email: String,
        user_type: String, // e.g., "Beneficiary", "Witness"
    }


    ///Create Beneficiary 
    public fun create_beneficiary(user_name: String, user_signature: String, clock: &Clock, phone_number: String, email: String, ctx: &mut TxContext): (ID, String) {
        let beneficiary = WillParties {
            id: object::new(ctx),
            user_name,
            user_signature,
            created_date: timestamp_ms(clock),
            phone_number,
            email,
            user_type: WILL_PARTIES_TYPE_BENEFICIARY.to_string()
        };
        let beneficiary_id = object::id(&beneficiary);
        transfer::transfer(beneficiary, tx_context::sender(ctx));
        (beneficiary_id, b"Beneficiary created successfully.".to_string())
    }

    ///Create Witness
    public fun create_witness(user_name: String, user_signature: String, clock: &Clock, phone_number: String, email: String, ctx: &mut TxContext): (ID, String) {
        let witness = WillParties {
            id: object::new(ctx),
            user_name,
            user_signature,
            created_date: timestamp_ms(clock),
            phone_number,
            email,
            user_type: WILL_PARTIES_TYPE_WITNESS.to_string()
        };
        let witness_id = object::id(&witness);
        transfer::transfer(witness, tx_context::sender(ctx));
        (witness_id, b"Witness created successfully.".to_string())
    }

    ///Will Structure
    public struct Will has key, store {
        id: UID,
        testator: address,
        assets: vector<ID>,
        created_date: u64,
        status: String, 
        legal_validation: bool,
        beneficiaries: vector<ID>,
        witnesses: vector<ID>,
        instructions: vector<String>,
        version_history: vector<String>
    }

    ///Will functions
    public fun create_will(inserted_assets: vector<ID>, inserted_legal_validation: bool, inserted_clock: &Clock, ctx: &mut TxContext, inserted_instructions: vector<String>, inserted_beneficiaries:vector<ID>, inserted_witness:vector<ID>):(ID, String){
        let will: Will = Will{
            id: object::new(ctx),
            testator: tx_context::sender(ctx),
            assets: inserted_assets,
            created_date: timestamp_ms(inserted_clock),
            status: STATUS_ACTIVE_BYTES.to_string(),
            legal_validation: inserted_legal_validation,
            beneficiaries: inserted_beneficiaries,
            witnesses: inserted_witness,
            instructions: inserted_instructions,
            version_history: vector[]
        };
        let will_id = object::id(&will);
        transfer::transfer(will, tx_context::sender(ctx));
        (will_id, b"Will created successfully.".to_string())
    }

    public fun update_will(will: &mut Will, new_assets: vector<ID>, new_legal_validation: bool, new_clock: &Clock, new_instructions: vector<String>, new_beneficiaries: vector<ID>, new_witnesses: vector<ID>): (&Will, String) {
        let will = will;
        will.assets = new_assets;
        will.legal_validation = new_legal_validation;
        will.created_date = timestamp_ms(new_clock);
        will.instructions = new_instructions;
        will.beneficiaries = new_beneficiaries;
        will.witnesses = new_witnesses;

        let mut updated_on = b"updated on ".to_string();
        let created_clock = timestamp_ms(new_clock).to_string();
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