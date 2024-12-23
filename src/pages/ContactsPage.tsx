
import Contacts from "../components/contacts/Contacts"
import Map from "../components/map/Map"
import QuestionForm from "../components/questionForm/QuestionForm"

const ContactsPage: React.FC = () => {
    return (
        <div className="container">
            <Contacts />
            <Map />
            <QuestionForm />
        </div>
    )
}
export default ContactsPage