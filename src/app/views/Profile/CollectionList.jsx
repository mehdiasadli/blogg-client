import styled from 'styled-components'
import Button from '../../atoms/Button'
import Pagination from '../../atoms/Pagination'
import FeedSkeleton from '../../atoms/Skeleton/FeedSkeleton'
import Title from '../../atoms/Title'
import CollectionPost from './CollectionPost'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import Modal from '../../atoms/Modal'
import Text from '../../atoms/Text'
import Field from '../../atoms/Field'
import { useCollectionList } from '../../../hooks/useCollectionList'
import ProfileList from './ProfileList'

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const List = styled.div`
  position: relative;
  padding-top: 1rem;
  padding-bottom: 3rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  @media (${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const AddNew = styled(Button)`
  @media (${(props) => props.theme.breakpoints.m}) {
    width: 50%;
    height: 2.5rem;
  }
  @media (${(props) => props.theme.breakpoints.sm}) {
    width: 40%;
    font-size: 12px;
    & div {
      display: none;
    }
  }
  @media (${(props) => props.theme.breakpoints.xsm}) {
    font-size: 10px;
  }
`

const CollectionList = () => {
  const {
    collections,
    isLoading,
    isOpen,
    page,
    handlePaginate,
    close,
    open,
    handleChange,
    handleSubmit,
    name
  } = useCollectionList()

  return (
    <ProfileList>
      <Header>
        <Title family>Collections</Title>
        <AddNew width={'15rem'} icon={<AddCircleRoundedIcon />} full={false} onClick={open}>
          Add new Collection
        </AddNew>
      </Header>
      <List>
        {isLoading ? (
          <FeedSkeleton profile />
        ) : (
          collections?.data?.map((item) => <CollectionPost key={item._id} coll={item} />) ||
          'No Collection'
        )}
      </List>
      {!isLoading && collections && (
        <PaginationContainer>
          <Pagination total={collections.total} page={page} handlePaginate={handlePaginate} />
        </PaginationContainer>
      )}
      <Modal open={isOpen} close={close} onConfirm={handleSubmit}>
        <Title as='h3'>New Collection</Title>
        <Text>You can gather your blogs into a collection. Enter your collection's title.</Text>
        <Field value={name} onChange={handleChange} autoFocus placeholder={'Collection Title'} />
      </Modal>
    </ProfileList>
  )
}

export default CollectionList
