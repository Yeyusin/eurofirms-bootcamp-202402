import { Button } from './index'

function Footer({ onHomeClick, onIssueClick, onTicketClick }) {
    return <footer className="flex flex-row justify-evenly border-t-2 border-black fixed bottom-0 w-full bg-white h-12 px-2 box-border">
        <Button onClick={onHomeClick}>🏚️</Button>
        <Button onClick={onTicketClick}>🎟️</Button>
        <Button onClick={onIssueClick}>☹️</Button>
    </footer>

} export default Footer