import { Button } from './index'

function Footer({ onHomeClick }) {
    return <footer className="flex justify-center border-t-2 border-black fixed bottom-0 w-full bg-white h-8 px-2 box-border">
        <Button onClick={onHomeClick}>🏚️</Button>
        <Button>🎟️</Button>
        <Button>☹️</Button>
        <Button>⚙️</Button>
    </footer>

} export default Footer