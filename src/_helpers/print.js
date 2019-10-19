import React from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { renderToString } from "react-dom/server";

window.html2canvas = html2canvas;
const Prints = (props) => (
    <div>
        <h3>{props.val}Time & Materials Statement of Work (SOW)</h3>
        <h4>General Information</h4>
        <table id="tab_customers" class="table table-striped" >
            <colgroup>
                <col span="1" />
                <col span="1" />
            </colgroup>
            <thead>
                <tr class="warning">
                    <th>SOW Creation Date</th>
                    <th>SOW Start Date</th>
                    <th>Project</th>
                    <th>Last Updated</th>
                    <th>SOW End Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dec 13, 2017</td>
                    <td>Jan 1, 2018</td>
                    <td>NM Connect - NMETNMCM</td>
                    <td>Dec 13, 2017</td>
                    <td>Dec 31, 2018</td>
                </tr>
            </tbody>
        </table>
        <p>
            This is a Time and Materials Statement of Work between Northwestern Mutual
            Life Insurance Company and Infosys with all general terms and conditions
            as described in the current Master Agreement and its related documents
    </p>
    </div>
);

export function printDocument(input) {
    const string = renderToString(<Prints val={5} />);
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.fromHTML(string);
    pdf.save("pdf");


    // html2canvas(input)
    //     .then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'JPEG', 0, 0);
    //         // pdf.output('dataurlnewwindow');
    //         pdf.save("download.pdf");
    //     })
    //     ;
}

export function printDocument2(input) {
    html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf");
    });
}


export function printDocument3(elems) {
    let pdf = new jsPDF("portrait", "mm", "a4");

    // Fix Graphics Output by scaling PDF and html2canvas output to 2
    pdf.scaleFactor = 2;

    // Create a new promise with the loop body
    //     let addPages = new Promise((resolve, reject) => {
    elems.forEach((elem, idx) => {
        // Scaling fix set scale to 2
        html2canvas(elem, { scale: "2" })
            .then(canvas => {
                if (idx < elems.length - 1) {
                    pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
                    pdf.addPage();
                } else {
                    pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
                    console.log("Reached last page, completing");
                }
            })

        // setTimeout(resolve, 100, "Timeout adding page #" + idx);
    })
    // }
    pdf.save("download.pdf");
}

//fromHTML
//
// export function printDocument3(input) {
//
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, 'PNG', 0, 0);
//         pdf.save("download.pdf");
//
// }

export function printDocument4(input) {
    let pdf = new jsPDF("portrait", "mm", "a4");

    domtoimage.toPng(input)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            pdf.addImage(img, 'PNG', 0, 0);
            pdf.save("download.pdf");
            // document.body.appendChild(img);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    // domtoimage.toBlob(input)
    //     .then(function (blob) {
    //         pdf.addImage(blob, 'PNG', 0, 0);
    //         pdf.save("download.pdf");
    //         // saveAs(blob, 'my-node.png');
    //     });
}

export function printDocument5(elems) {
    let pdf = new jsPDF("portrait", "mm", "a4");


    elems.forEach((elem, idx) => {
        if (idx !== 0 && idx % 21 === 0 && idx < elems.length - 1) {
            domtoimage.toPng(elem)
                .then(function (dataUrl) {
                    let img = new Image();
                    img.src = dataUrl;
                    pdf.addImage(img, 'PNG', 0, 0);
                    pdf.addPage();
                    // document.body.appendChild(img);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
        } else {
            domtoimage.toPng(elem)
                .then(function (dataUrl) {
                    let img = new Image();
                    img.src = dataUrl;
                    pdf.addImage(img, 'PNG', 0, 0);

                    // document.body.appendChild(img);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
        }
    });
    // pdf.save("download.pdf");
}


export function printDocument6(elems, title) {
    let pdf = new jsPDF("portrait", "mm", "a4");

    domtoimage.toBlob(elems)
        .then(function (blob) {
            pdf.addImage(blob, 'PNG', 0, 0);
            pdf.save("download.pdf");
            saveAs(blob, title + '-apuesta.png');
        });
}