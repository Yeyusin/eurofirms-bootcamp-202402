import { Button } from './index'

function Footer({ onHomeClick, onIssueClick, onTicketClick }) {
    return <footer className="flex flex-row justify-evenly border-t-2 border-black w-full bg-[#e4b641] px-4 py-2 z-10 box-border">
        <Button onClick={onHomeClick}>🏚️</Button>
        <Button onClick={onTicketClick}>🎟️</Button>
        <Button onClick={onIssueClick}>☹️</Button>
    </footer>

} export default Footer