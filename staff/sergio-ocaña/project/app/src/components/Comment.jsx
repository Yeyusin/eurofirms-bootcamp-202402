import logic from "../logic"
import { useState } from "react"
import { HTag, Button, Form, LabelInput, ButtonText, P } from '../components'
import { errors } from "com"

const { ContentError, MatchError } = errors

function Comment({ comment, isEditing, onDeleteClick, onSubmitUpdate, onCancelClick, handleEditButton }) {
    const [text, setText] = useState(comment.text)

    const { author } = comment

    const isAuthorComment = author.id === logic.getLoggedInUserId()
    const isEditingComment = comment.id === isEditing?.id

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback},please verify credentials`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
    }

    const onEditClick = () => {
        try {
            logic.retrieveComment(comment.id)
                .then(res => {
                    setText(res.text)

                    handleEditButton(comment.id)
                })
                .catch(error => errorHandler(error))

        } catch (error) {
            errorHandler(error)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const updateText = form.text.value

        onSubmitUpdate(comment.id, updateText)
    }

    return < article className='w-full bg-white rounded-xl p-2'>
        <HTag level={3}>{author.name}</HTag>
        {isEditing?.value && isEditingComment ? <>
            <Form onSubmit={handleSubmit}>
                <LabelInput text='Text to update' id='text' defaultValue={text} />
                <div className='flex flex-row'>
                    <ButtonText type='button' onClick={onCancelClick}>Cancel</ButtonText>
                    <ButtonText type='submit'>Update</ButtonText>
                </div>
            </Form >
        </>
            : <>
                <P>{comment.text}</P>
                <time className='block text-right text-xs'>{comment.date}</time>
                {isAuthorComment && <Button onClick={() => onEditClick(comment.id)}>✏️</Button>}
                {(isAuthorComment || logic.isManagerUserLoggedIn()) && < Button onClick={() => onDeleteClick(comment.id)}>🗑️</Button>}
            </>}
    </article >
} export default Comment