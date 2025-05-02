import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton } from 'react-share'
import { FacebookIcon, TwitterIcon, LinkedinIcon, EmailIcon } from 'react-share'

const ShareButton = () => {
  const url = 'http://yourwebsite.com' 
  const title = 'Check out this article!' 

  return (
    <div className="flex space-x-4">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={url} subject={title} body="Check out this blog post!">
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}

export default ShareButton