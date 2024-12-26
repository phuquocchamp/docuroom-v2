import SideBar from "../components/Sidebar";
import Header from "../components/Header";
// import SearchInput from "../components/SearchInput";
// import Tag from "../components/Tag";
// import DocumentCard from "../components/DocumentCard";
import MyFolder from "../components/MyFolder";

function Document(): JSX.Element {
    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* <Header /> */}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="px-6 py-8">
                        <div className="flex justify-between items-center">
                            {/* <SearchInput />
                            <Tag /> */}
                        </div>

                        <div className="mt-8">
                            <MyFolder />
                        </div>

                        <div className="mt-8">{/* <DocumentCard /> */}</div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Document;
