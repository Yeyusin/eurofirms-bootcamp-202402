import { Button, HTag } from './index'
import logic from '../logic'

function Issue({ issue, onCloseIssueButton, onDeleteIssueButton, onCommentButtonClick, commentButton }) {
    const isIssueOpen = issue.status === 'open'

    const prop = commentButton ? 'flex flex-row px-2 justify-between' : 'flex flex-row px-2'

    return <article className=' flex flex-col p-2 bg-slate-500 w-full' >
        <div className='bg-orange-300 flex flex-row justify-between items-center w-full px-2' >
            <HTag level={3}>{issue.id}</HTag>
            <p className={isIssueOpen ? 'text-green-600' : 'text-red-600'}>{`(${issue.status})`}</p>
        </div>
        <div className={prop}>
            <p className='text-white'>{issue.cinema.name}</p>
            <p className='text-white'>{issue.location}</p>
        </div>
        <p className='text-white px-2'>{issue.type}</p>
        <p className='text-white px-2'>{issue.description}</p>
        {logic.isManagerUserLoggedIn() && <p className='text-green-600 px-2'>{issue.author.name}</p>}
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row justify-start'>
                {commentButton && <Button onClick={() => onCommentButtonClick(issue.id)}>💬</Button>}
                {commentButton && logic.isManagerUserLoggedIn() && <>
                    <Button onClick={() => onCloseIssueButton(issue.id)}>✔</Button>
                    <Button onClick={() => onDeleteIssueButton(issue.id)}>🗑</Button>
                </>
                }
            </div>
            <time className='text-gray-400 text-sm px-2' >{issue.date}</time>
        </div>
    </article>

} export default Issue