import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { userActions } from '../../store/actions';
import { current, update } from '../../service/api/cambio/cambio';
import AdminTitle from '../Admin/components/AdminTitle_Center';
import CustomText from '../View/CustomText_1';

import './Cambio.css'

const Cambio = (props) => {
  const [lempira, setInputLempiras] = useState('');

  useEffect(() => {
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    current().then((result) => {
      setInputLempiras(result);
      dispatch(userActions.loading_end())
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }, []);

  function handleOnClickCambio() {
    if (lempira === '' || lempira === 0)
      return;
    let data = {
      cambio: lempira
    };
    const { dispatch } = props;
    dispatch(userActions.loading_start())
    update(data).then((result) => {
      setInputLempiras(result.cambio);
      dispatch(userActions.loading_end())
    })
      .catch(function (error) {
        dispatch(userActions.loading_end())
      });
  }

  return (
    <React.Fragment>
      <AdminTitle titleLabel='Tipo de Cambio' />
      <Container maxwidth="xs" className="admin_tipo_de_cambio">
        <Grid className="input">
          <CustomText placeholder='Lempiras'
            onInput={e => setInputLempiras(e.target.value)}
            value={lempira}
          ></CustomText>
        </Grid>
        <Grid className="button">
          <Fab className="btn_change" variant="extended" onClick={handleOnClickCambio} >
            <span className="text">Cambiar</span>
          </Fab>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default connect()(Cambio);