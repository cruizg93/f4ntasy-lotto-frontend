import { keyframes } from 'emotion'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const spinnerDash = keyframes`
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124px;
  }
`

export default {
  wrapper: (state) => ({
    position: 'relative',
    ...state
  }),
  overlay: (state, props) => ({
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0px',
    left: '0px',
    display: 'flex',
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#FFF',
    background: 'rgba(0, 0, 0, 0.2)',
    zIndex: 800,
    transition: `opacity ${props.fadeSpeed}ms ease-in`,
    opacity: (state === 'entering' || state === 'entered') ? 1 : 0
  }),
  content: () => ({
    margin: 'auto',
    width: '100px',
    height: '100px',
    backgroundColor: 'white',
    borderRadius: '10px',
    border: 'solid 2px #a6a5a5',
    position: 'fixed',
    left: '38%',
    top: '44%'
  }),
  spinner: (state) => ({
    position: 'relative',
    margin: '0px auto 10px auto',
    width: '54px',
    maxHeight: '100%',
    '&:before': {
      content: '""',
      display: 'block',
      paddingTop: '100%'
    },
    '& svg': {
      animation: `${rotate360} 2s linear infinite`,
      height: '100%',
      transformOrigin: 'center center',
      width: '100%',
      position: 'absolute',
      top: '35px',
      bottom: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      '& circle': {
        animation: `${spinnerDash} 1.5s ease-in-out infinite`,
        strokeDasharray: '1,200',
        strokeDashoffset: 0,
        strokeLinecap: 'round',
        // stroke: '#2B2B2C'
      }
    }
  })
}
