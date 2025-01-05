import SwiftUI
import FirebaseFirestore

struct Item: Identifiable {
    let id: String
    let name: String
    let description: String
    let owner: String
}

class ItemViewModel: ObservableObject {
    @Published var items = [Item]()

    private let db = Firestore.firestore()

    func fetchItems() {
        db.collection("items").addSnapshotListener { snapshot, error in
            guard let documents = snapshot?.documents else { return }
            self.items = documents.map { doc in
                let data = doc.data()
                return Item(
                    id: doc.documentID,
                    name: data["name"] as? String ?? "",
                    description: data["description"] as? String ?? "",
                    owner: data["owner"] as? String ?? ""
                )
            }
        }
    }

    func addItem(name: String, description: String, owner: String) {
        db.collection("items").addDocument(data: [
            "name": name,
            "description": description,
            "owner": owner
        ])
    }
}

struct ItemListView: View {
    @StateObject private var viewModel = ItemViewModel()

    var body: some View {
        NavigationView {
            List(viewModel.items) { item in
                VStack(alignment: .leading) {
                    Text(item.name).font(.headline)
                    Text(item.description).font(.subheadline)
                }
            }
            .navigationTitle("Items")
            .onAppear {
                viewModel.fetchItems()
            }
        }
    }
}
