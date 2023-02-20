import { Helmet } from 'react-helmet'

const Html = ({ title = 'Blogg.' }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default Html
