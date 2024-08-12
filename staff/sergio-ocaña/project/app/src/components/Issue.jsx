import { Button, HTag } from './index'
import logic from '../logic'

function Issue({ issue, onCloseIssueButton, onDeleteIssueButton, onCommentButtonClick }) {
    const isIssueOpen = issue.status === 'open'

    return <article className=' flex flex-col p-2 bg-slate-500 w-full' >
        <div className='bg-orange-300 flex flex-row justify-around items-center w-full ' >
            <HTag level={3}>{issue.id}</HTag>
            <p className={isIssueOpen ? 'text-green-600' : 'text-red-600'}>{issue.status}</p>
        </div>
        <p className='text-gray-400 '>{issue.cinema.name}</p>
        <p className='text-gray-400'>{issue.type}</p>
        <p className='text-gray-400'>{issue.description}</p>
        {logic.isManagerUserLoggedIn() && <p className='text-green-600'>{issue.author.name}</p>}
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row justify-start'>
                <Button onClick={() => onCommentButtonClick(issue.id)}>💬</Button>
                {logic.isManagerUserLoggedIn() && <>
                    <Button onClick={() => onCloseIssueButton(issue.id)}>✔</Button>
                    <Button onClick={() => onDeleteIssueButton(issue.id)}>🗑</Button>
                </>
                }
            </div>
            <time className='text-gray-400 text-sm' >{issue.date}</time>
        </div>
    </article>

} export default Issue