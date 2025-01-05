import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            SignInView()
                .tabItem {
                    Label("Sign In", systemImage: "person.circle")
                }
            ItemListView()
                .tabItem {
                    Label("Items", systemImage: "list.bullet")
                }
        }
    }
}
