import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { BsStar } from "react-icons/bs";
import CustomInput from "./CustomInput";
import { createReviewAction } from "../../redux/reviewAction";

const initialFormData = {
    message: '',
    rating: 5,
  }
  const ReviewBookModal = (props) => {
    const { showModal, setShowModal, borrow } = props

    const { formData, handleOnChange, setFormData } = useForm(initialFormData)
    const {message, rating } = formData
    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleOnClick=()=>{
        //prepare payload to be sent for review boook
        const reviewObj = {
            borrow_id: borrow?._id,
            book_id: borrow?.book_id,
            book_title: borrow?.book_name,
            user_id: user?._id,
            user_name: `${user?.first_name} ${user?.last_name}`,
            message: message,
            rating: rating,
          }
          // call action to review book
          dispatch(createReviewAction(reviewObj))
          setShowModal(false)
     
    }
    return ( 
        <>
        <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        centered
        >
        < Modal.Header closeButton>
          <Modal.Title>Review Book</Modal.Title>
        </Modal.Header>

        <Modal.Body className='mx-auto w-100'>
          <Form.Group className='mb-2'>
            <Form.Label className='fw-bold mb-0'>
              Select Rating
            </Form.Label>
            <Stack direction='horizontal' gap={1}>
              { [1,2,3,4,5].map((value) => (
                <BsStar 
                  key={value}
                  style={{cursor: 'pointer', }}
                  onClick={() => setFormData({...formData, rating: value})}
                  fill={rating >= value ? 'orange' : ''}
                /> 
              )) }
            </Stack>
            </Form.Group>

            <CustomInput
            handleOnChange={handleOnChange}
            label= "Review"
            inputAttributes= {{
              name: 'message',
              value: message,
              as: 'textarea',
              rows: 6,
              required: true,
            }}
          />
        </Modal.Body>
          <Modal.Footer>
          <Button variant="outline-success" onClick={handleOnClick}>Submit</Button>

          <Button variant="outline-danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>

        </Modal>
        </>
     );
  }
   
  export default ReviewBookModal;