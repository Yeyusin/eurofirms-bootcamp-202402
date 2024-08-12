import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Input, Button, ButtonText, Article } from '../components'
import Issue from '../components/Issue'
import logic from '../logic'
import { errors } from 'com'
import Comment from '../components/Comment'

const { ContentError, MatchError } = errors

function IssueWithComments({ onLeftArrowClick }) {
    const { issueId } = useParams()

    const [comments, setComments] = useState(null)
    const [issue, setIssue] = useState(null)
    const [refreshStamp, setRefreshStamp] = useState(Date.now())
    const [isEditing, setIsEditing] = useState({ value: false, id: 0 })
    const [createComment, setCreateComment] = useState(null)

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
        try {
            logic.retrieveCommentsFromIssue(issueId)
                .then(({ comments, issue }) => {
                    setComments(comments)
                    setIssue(issue)
                })
                .catch(error => errorHandler(error))

        } catch (error) {
            errorHandler(error)
        }
    }, [refreshStamp])

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
                .then(() => setRefreshStamp(Date.now))
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
                .then(() => setRefreshStamp(Date.now()))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleSubmitUpdate = (commentId, text) => {
        try {
            logic.updateComment(commentId, text)
                .then(() => {
                    setRefreshStamp(Date.now())
                    setIsEditing({ value: false, id: 0 })
                })
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const onCancelComment = () => setCreateComment(null)

    const handleCancelClick = () => setIsEditing({ value: false, id: 0 })

    const handleEditButton = commentId => setIsEditing({ value: true, id: commentId })

    const handleCommentButton = () => setCreateComment(true)

    return <Article>
        <Button className='text-3xl' onClick={onLeftArrowClick}>←</Button >
        {issue && <Issue issue={issue} onCommentButtonClick={handleCommentButton} onCloseIssueButton={handleCloseIssueButton} onDeleteIssueButton={handleDeleteIssueButton} />}
        {comments?.length !== 0 && comments?.map(comment => {
            return <Comment key={comment.id} onDeleteClick={handleDeleteClick} onSubmitUpdate={handleSubmitUpdate} onCancelClick={handleCancelClick} onCommentButtonClick={handleCommentButton} handleEditButton={handleEditButton} comment={comment} isEditing={isEditing} />
        })}
        {createComment && <div className='w-full flex-flex-col justify-center fixed bottom-12 pt-4 border-box  bg-[#e4b641]'>
            <Form id='addComent' onSubmit={handleCreateSubmit}>
                <Input id='text' placeholder='Add a new comment' />
                <div className='w-full flex flex-row justify-center'>
                    <ButtonText type='button' onClick={onCancelComment}>Cancel</ButtonText>
                    <ButtonText form='addComent' type='submit'>Send</ButtonText>
                </div>
            </Form>
        </div>}
    </Article>
}
export default IssueWithComments