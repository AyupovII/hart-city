import Banner from "../components/banner/Banner"
import RequestsContent from "../components/requests/requestsContent/RequestsContent"
import CheckingClient from "../components/checkingClient/CheckingClient"
import PersonManager from "../components/personManager/PersonManager"
import ObjectsContent from "../components/objects/objectsContent/ObjectsContent"

const Main: React.FC = () => {
    return (
        <div className="container">
            <Banner />
            <ObjectsContent />
            <RequestsContent />
            <CheckingClient />
            <PersonManager />
        </div>
    )
}

export default Main