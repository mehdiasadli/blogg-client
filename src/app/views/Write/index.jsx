import ReactQuill from 'react-quill'
import styled, { useTheme } from 'styled-components'
import Button from '../../atoms/Button'
import Field from '../../atoms/Field'
import { NAV_HEIGHT } from '../../components/layouts/Navbar'
import Select from '../../atoms/Select'
import Spinner from '../../atoms/Spinner'
import { useWrite } from '../../../hooks/useWrite'
import 'react-quill/dist/quill.snow.css'
import { formats, modules } from '../../../data/quill'
import { makeFilter } from '../../../utils/makeFilter'
import Modal from '../../atoms/Modal'
import Title from '../../atoms/Title'
import Text from '../../atoms/Text'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'

const Container = styled.div`
  margin-top: ${NAV_HEIGHT}rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  min-height: calc(100vh - ${NAV_HEIGHT}rem);
  background-color: ${(props) => props.theme.colors.background.main};
  color: ${(props) => props.theme.colors.text.main};
`
const Wrapper = styled(ReactQuill)`
  box-shadow: ${(props) => props.shadows.low};

  padding: 0;
  & .ql-toolbar {
    border: none !important;
    border-radius: 3px 3px 0 0;
    background-color: ${(props) => props.colors.background.dark};
  }

  & .ql-toolbar span {
    color: ${(props) => props.colors.text.main};
  }
  & .ql-toolbar .ql-stroke {
    ${(props) => props.result};
  }
  & .ql-container {
    border-radius: 0 0 3px 3px;
    border: none !important;
    background-color: ${(props) => props.colors.background.light};
  }
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    gap: 1rem;
  }
`
const AddNew = styled(Button)`
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }

  @media (${(props) => props.theme.breakpoints.xsm}) {
    font-size: 10px;
  }
`

const Write = () => {
  const {
    title,
    content,
    handleChange,
    isLoading,
    collections,
    collectionId,
    setId,
    handlePublish,
    name,
    isOpen,
    open,
    close,
    handleSubmit,
    handleTextChange
  } = useWrite()
  const { colors, shadows } = useTheme()

  return (
    <Container>
      <Header>
        <Field
          width={'20rem'}
          placeholder={'Blog Title'}
          value={title}
          onChange={(v) => handleChange(v, 'title')}
        />
        {isLoading ? (
          <Spinner />
        ) : collections ? (
          <Select data={collections.data} value={collectionId} onChange={setId} />
        ) : (
          <AddNew width={'15rem'} icon={<AddCircleRoundedIcon />} full={false} onClick={open}>
            Add new Collection
          </AddNew>
        )}
      </Header>
      <Wrapper
        colors={colors}
        shadows={shadows}
        result={makeFilter(colors.text.main)}
        theme='snow'
        value={content}
        onChange={(v) => handleChange(v, 'content')}
        modules={modules}
        formats={formats}
      />
      <Button width='10rem' onClick={handlePublish}>
        Publish
      </Button>
      <Modal open={isOpen} close={close} onConfirm={handleSubmit}>
        <Title as='h3'>New Collection</Title>
        <Text>You can gather your blogs into a collection. Enter your collection's title.</Text>
        <Field
          value={name}
          onChange={handleTextChange}
          autoFocus
          placeholder={'Collection Title'}
        />
      </Modal>
    </Container>
  )
}

export default Write
