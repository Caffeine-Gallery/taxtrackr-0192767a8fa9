import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor TaxPayerManager {
    private type TaxPayer = {
        tid: Text;
        firstName: Text;
        lastName: Text;
        address: Text;
    };

    private stable var taxPayersEntries : [(Text, TaxPayer)] = [];
    private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

    system func preupgrade() {
        taxPayersEntries := Iter.toArray(taxPayers.entries());
    };

    system func postupgrade() {
        taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 0, Text.equal, Text.hash);
    };

    public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async () {
        let newTaxPayer : TaxPayer = {
            tid = tid;
            firstName = firstName;
            lastName = lastName;
            address = address;
        };
        taxPayers.put(tid, newTaxPayer);
    };

    public query func getAllTaxPayers() : async [TaxPayer] {
        Iter.toArray(taxPayers.vals())
    };

    public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
        taxPayers.get(tid)
    };
}
