import { useEffect, useState } from 'react'
import { Button, HTag, RadioButton } from '../components'
import Issue from '../components/Issue'
import logic from '../logic'
import CreateIssue from '../components/CreateIssue'
import { errors } from 'com'
import IsManagerUserLoggedIn from '../logic/IsManagerUserLoggedIn'

const { MatchError, ContentError } = errors


function Issues({ routeStamp }) {
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

        alert(feedback)
    }

    useEffect(() => {
        try {
            const promise = logic.IsManagerUserLoggedIn() ? logic.retrieveCinemaIssues() : logic.retrieveUserIssues()

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

    const handleCommentButton = () => { }

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
        try {
            logic.deleteIssue(issueId)
                .then(() => setTimeStamp(Date.now()))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }


    return <main className='flex flex-col my-14'>
        <div className='flex flex-row  justify-between mx-8'>
            <HTag level={2}>Issues </HTag>
            <RadioButton OnRadioButtonClick={handleRadioButtonClick} />
        </div>

        {issues ? issues?.filter(issue => issue.status === status).map(issue => {
            return <Issue key={issue.id} issue={issue} onCommentButtonClick={handleCommentButton} onCloseIssueButton={handleCloseIssueButton} onDeleteIssueButton={handleDeleteIssueButton} />
        }) : <p className=' place-self-center'>We are happy not issues avalaible to see</p>}


        {!IsManagerUserLoggedIn() && <Button onClick={handleCreateView}>Create Issue</Button>}
        {view && <CreateIssue handleCancelButtonIssue={handleCancelButtonIssue} handleCreatedIssue={handleCreatedIssue} />}
    </main>

} export default Issues