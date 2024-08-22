import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Input, Button, Article } from '../components'
import Issue from '../components/Issue'
import logic from '../logic'
import { errors } from 'com'
import Comment from '../components/Comment'
import { PaperAirplaneIcon } from '@heroicons/react/16/solid'

const { ContentError, MatchError } = errors

function IssueWithComments({ onLeftArrowClick }) {
    const { issueId } = useParams()

    const [comments, setComments] = useState(null)
    const [issue, setIssue] = useState(null)
    const [isEditing, setIsEditing] = useState({ value: false, id: 0 })

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please verify it`
        else feedback = 'sorry, there was an error, please try again later'

        if (error.message.includes('expired')) logic.deleteToken()

        alert(feedback)
    }

    useEffect(() => {
        let intervalId

        retrieveCommentsFromIssue(issueId)
            .then(() => {
                intervalId = setInterval(() => {
                    retrieveCommentsFromIssue(issueId)
                }, 1000)
            })

        return () => clearInterval(intervalId)
    }, [])

    const retrieveCommentsFromIssue = issueId => {
        return logic.retrieveCommentsFromIssue(issueId)
            .then(({ comments, issue }) => {
                setComments(comments)
                setIssue(issue)
            })
    }

    const handleCloseIssueButton = issueId => {
        try {
            logic.closeIssue(issueId)
                .then(() => retrieveCommentsFromIssue(issueId))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const onDeleteIssue = () => setTimeStamp(Date.now())

    const handleDeleteIssueButton = issueId => {
        const deleteOrNot = confirm('Are you sure about to delete this issue?')

        if (!deleteOrNot) return
        try {
            logic.deleteIssue(issueId)
                .then(() => onDeleteIssue())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }
    const handleDeleteClick = commentId => {
        const deleteOrNot = confirm('Are you sure about to delete this comment?')

        if (!deleteOrNot) return
        try {
            logic.deleteComment(commentId)
                .then(() => retrieveCommentsFromIssue(issueId))
                .catch(error => errorHandler(error))

        } catch (error) {
            errorHandler(error)
        }
    }
    const handleCreateSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        try {
            logic.createComment(issueId, text)
                .then(() => retrieveCommentsFromIssue(issueId))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleSubmitUpdate = (commentId, text) => {
        try {
            logic.updateComment(commentId, text)
                .then(() => {
                    retrieveCommentsFromIssue(issueId)
                    setIsEditing({ value: false, id: 0 })
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleCancelClick = () => setIsEditing({ value: false, id: 0 })

    const handleEditButton = commentId => setIsEditing({ value: true, id: commentId })

    const handleCommentButton = () => { }

    return <>
        <Article>
            <div className='flex flex-col gap-2 w-full h-full'>
                <Button className='text-5xl' onClick={onLeftArrowClick}>←</Button >
                {issue && <Issue issue={issue} onCommentButtonClick={handleCommentButton} onCloseIssueButton={handleCloseIssueButton} onDeleteIssueButton={handleDeleteIssueButton} />}
                <ul className='flex flex-col h-auto w-full gap-2 overflow-auto'>
                    {comments?.length !== 0 && comments?.map(comment => {
                        return <Comment key={comment.id} onDeleteClick={handleDeleteClick} onSubmitUpdate={handleSubmitUpdate} onCancelClick={handleCancelClick} onCommentButtonClick={handleCommentButton} handleEditButton={handleEditButton} comment={comment} isEditing={isEditing} />
                    })}
                </ul>
            </div>
        </Article>
        < Form id='addComment' onSubmit={handleCreateSubmit}>
            <div className='flex flex-row bg-gray-100 fixed w-full bottom-0 mb-12 z-10 gap-1 p-1' >
                <Input id='text' placeholder='Add a new comment' />
                <Button form='addComment' type='submit'>💬</Button>
                {/* <PaperAirplaneIcon className='size-8' form='addComment' type='submit' /> */}
            </div>
        </Form>
    </>
}
export default IssueWithComments