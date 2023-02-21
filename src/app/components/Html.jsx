import { Helmet } from 'react-helmet-async'

const Html = ({ title = 'Blogg.' }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default Html
