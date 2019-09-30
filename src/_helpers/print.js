import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

window.html2canvas = html2canvas;

export function printDocument(input) {
    html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
        })
        ;
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
    // let pdf = new jsPDF("portrait", "mm", "a4");

    domtoimage.toBlob(elems)
        .then(function (blob) {
            // pdf.addImage(blob, 'PNG', 0, 0);
            // pdf.save("download.pdf");
            saveAs(blob, title + '-apuesta.png');
        });
}