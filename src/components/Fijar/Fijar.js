import React from 'react';
import Container from '@material-ui/core/Container';
import { GoTools } from "react-icons/go";

export default function Fijar() {
    // const [numberList, setNumberList] = useState([]);

    // useEffect(() => {
    //     list_numeros().then((result) => {
    //         setNumberList(Array.from(result));
    //     })
    // }, []);

    return (
        <React.Fragment>
            <Container maxwidth="xs" style={{ background: 'white' }} >
                <div style={{ textAlign: 'center', paddingTop: 60 }}>
                    <div>
                        <GoTools size={40} />
                    </div>
                    <div style={{ fontSize: 25, paddingTop: 20 }}>
                        Bajo construcción!!!
                    </div>
                    {/* <List dense className={classes.root}>
                        {numberList.map((element, index) =>
                            <Entry key={index} numero={element.numero} tope={element.tope} />
                        )}

                    </List> */}
                </div>
            </Container>
        </React.Fragment>

    )
}