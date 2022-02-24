import { Helmet } from 'react-helmet'

const HeadInfo = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default HeadInfo