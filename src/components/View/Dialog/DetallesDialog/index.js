import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DiariaLogo from '../../assets/Diaria_PNG.png';
import ChicaLogo from '../../assets/Chica_PNG.png';
import ListHistoryDetail from '../../../Player/components/Historial/ListHistoryDetail'
import { FaFileExcel, FaRegTimesCircle } from "react-icons/fa";
import './styles.css'

class DetallesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.handleClose();
  }
  render() {
    const icon = this.props.icon;

    return (
      this.props.winList ?
        <Dialog
          disableBackdropClick
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <DialogTitle className="detalles-dialog-title"  >
            <div className="header">
              <div className="text">
                Detalles
            </div>
              <div className="icon_fileExcel">
                <FaFileExcel size={30} />
              </div>
            </div>
            <div className="icon_close" onClick={() => this.handleCancel()}>
              <Button style={{ minWidth: 30 }}><FaRegTimesCircle size={20} /></Button>
            </div>
            <div className="date_winNum">
              <div className="icon">
                {this.props.dataset.winner.type === "DIARIA" ? <img src={DiariaLogo} alt="DiariaLogo" /> : <img src={ChicaLogo} alt="ChicaLogo" />}
              </div>
              <div className="date">
                {this.props.dataset.winner.hour}{'\u00A0'}{'-'}{}{'\u00A0'}{this.props.day}
              </div>
              <div className="winNum">
                <div className="circle">
                  <div className="inlineText">{this.props.winNum ? this.props.winNum.toString().padStart(2, '0') : '00'}</div>
                </div>
              </div>
            </div>
            <div className="blank_white"></div>
          </DialogTitle>
          <DialogContent className="detalles-dialog-content">
            <div className="username">
              {'Propias'}{'\u00A0'}{this.props.currentUser.username}{'\u00A0'}{'-'}{'\u00A0'}{this.props.money}{'[nombre]'}
            </div>
            <div className="bet_info">
              <ListHistoryDetail list={this.props.winList.apuestas}
                width={'78%'} marginLeft={22} paddingTop={12}
              >
              </ListHistoryDetail>
            </div>
            <div className="username_bottom">
              {this.props.currentUser.username}{'x1'}{'\u00A0'}{'[nombre]'}
            </div>
            <div className="etc">
              {'Etc..etc...etc.'}
            </div>
          </DialogContent>
        </Dialog>
        :
        null
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { currentUser } = user;
  return { currentUser }
};

export default connect(mapStateToProps)(DetallesDialog);
