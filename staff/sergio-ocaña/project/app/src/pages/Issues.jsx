import { useEffect, useState } from 'react'
import { Button, HTag, RadioButton, Article, P } from '../components'
import Issue from '../components/Issue'
import logic from '../logic'
import CreateIssue from '../components/CreateIssue'
import { errors } from 'com'

const { MatchError, ContentError } = errors


function Issues({ handleCommentButton, routeStamp, onCreateIssue }) {
    const [issues, setIssues] = useState(null)
    const [status, setStatus] = useState('open')
    const [view, setView] = useState(null)
    const [timeStamp, setTimeStamp] = useState(Date.now())

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please try to relog again`
        else feedback = 'sorry, there was an error, please try again later'

        if (error.message.includes('expired')) logic.deleteToken()

        alert(feedback)
    }

    useEffect(() => {
        try {
            const promise = logic.isManagerUserLoggedIn() ? logic.retrieveCinemaIssues() : logic.retrieveUserIssues()

            promise
                .then(issues => {
                    setIssues(issues)
                })
                .catch(error => {
                    errorHandler(error)
                })
        } catch (error) {
            errorHandler(error)
        }
    }, [timeStamp, routeStamp])

    const handleRadioButtonClick = () => {
        let change = 'closed'

        if (status === change)
            change = 'open'

        setStatus(change)
    }
    const handleCreateView = () => setView(true)

    const handleCancelButtonIssue = () => setView(false)

    const handleCreatedIssue = () => {
        setView(false)

        setTimeStamp(Date.now())
    }

    const handleCloseIssueButton = issueId => {
        try {
            logic.closeIssue(issueId)
                .then(() => setTimeStamp(Date.now()))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleDeleteIssueButton = issueId => {
        const deleteOrNot = confirm('Are you sure about to delete this issue?')

        if (!deleteOrNot) return

        try {
            logic.deleteIssue(issueId)
                .then(() => setTimeStamp(Date.now()))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }



    return <Article>
        <div className='flex flex-col w-full h-full gap-2'>
            <div className='flex flex-row justify-center w-full h-8'>
                <div className='w-1/2 flex flex-col justify-center'>
                    <HTag>Issues </HTag>
                </div>
                {!logic.isManagerUserLoggedIn() && <Button className='text-2xl' onClick={onCreateIssue}>➕</Button>}
                <div className='w-1/2 flex flex-row justify-end'>
                    <RadioButton status={status} OnRadioButtonClick={handleRadioButtonClick} />
                </div>
            </div>

            <section className='flex flex-col gap-2 h-auto overflow-auto'>
                {issues ? issues?.filter(issue => issue.status === status).map(issue => {
                    return <Issue key={issue.id} issue={issue} onCommentButtonClick={handleCommentButton} onCloseIssueButton={handleCloseIssueButton} onDeleteIssueButton={handleDeleteIssueButton} commentButton={1} />
                }) : <P className=' place-self-center'>We are happy not issues avalaible to see</P>
                }
            </section>

            {issues?.length === 0 && < P className=' place-self-center'>We are happy not issues avalaible to see</P>}
            {view && <div className='w-auto bottom-10 fixed my-10]'>
                <CreateIssue handleCancelButtonIssue={handleCancelButtonIssue} handleCreatedIssue={handleCreatedIssue} />
            </div>}
        </div>
    </Article>
} export default Issues