// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Loader2, Upload } from "lucide-react"
// import * as XLSX from 'xlsx';
// import mammoth from 'mammoth';
// import { emailCaptacionHTML } from './emailCaptacionHTML'
// import { toast } from 'sonner';

// export const LeerCSV = () => {

//     const [parsedData, setParsedData] = useState([]);
//     const listaCaptacion = new Array()
//     const [tableRows, setTableRows] = useState([]);
//     const expt = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
//     const arrayEmail = ['carlos.facundo.rr@gmail.com', 'giu40150135@gmail.com']
//     const [values, setValues] = useState([]);
//     const [tableData, setTableData] = useState()
//     const [content, setContent] = useState([]);

//     const [file, setFile] = useState(null)
//     const [objetivo, setObjetivo] = useState("")

//     const handleEnviar = async () => {
//         // Aquí iría la lógica para procesar el archivo y enviar los correos
//         console.log("Objetivo:", objetivo)

//         if (objetivo == "Captacion") {

//             setFile(null)

//             // const correosMasivos = await supabaseClient
//             //     .from("correosEnviados")
//             //     .select("*")
//             //     .eq("id", 1)

//             // const result3 = await supabaseClient.from("correosEnviados").update({
//             //     correos: [...correosMasivos.data[0]?.correos, ...values]
//             // }).eq("id", 1);

//             // const result4 = await supabaseClient.from("correosEnviados").insert({
//             //     correos: values,
//             //     remailing: true
//             // })

//             // const result4 = await supabaseClient.from("correosEnviados").insert({
//             //     correos: values
//             // })

//             // console.log(result4);

//             const result = await sendMail(emailCaptacionHTML())

//             setValues([])

//             if (result.message == "Email Masivo enviado exitosamente!") {
//                 toast.success(result.message)
//             }

//         }



//     }


//     const convertToJson = async (headers, data) => {
//         const rows = []
//         setValues([])
//         data.forEach(async row => {
//             let rowData = {}
//             row.forEach(async (element, index) => {
//                 rowData[headers[index]] = element;
//             })


//             Object.entries(rowData).forEach(([key, value]) => {

//                 if (expt.test(value)) {
//                     setValues((ant) => [...ant, value])
//                 }

    
//             })
//             rows.push(rowData)
//         });
//         setTableData(rows)
//         // await sendMail()
//         return rows
//     }
//     const importExcel = (e) => {
//         const file = e.target.files[0]
//         setFile(e.target.files[0])
//         const reader = new FileReader()
//         reader.onload = (event) => {
//             const bstr = event.target.result
//             const workBook = XLSX.read(bstr, { type: "binary" })
//             const workSheetName = workBook.SheetNames[0]
//             const workSheet = workBook.Sheets[workSheetName]
//             const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
//             const headers = fileData[0]

//             const heads = headers.map(head => ({ title: head, field: head }))
//             fileData.splice(0, 1)
//             convertToJson(headers, fileData)
//         }
//         reader.readAsBinaryString(file)
//     }

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];

//         console.log(file.type);

//         if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 mammoth.extractRawText({ arrayBuffer: e.target.result })
//                     .then(result => {
//                         setContent(result.value.split('\n'));
//                     })
//                     .catch(err => console.error(err));
//             };
//             reader.readAsArrayBuffer(file);

//             content.map((val, index) => {

//                 if (expt.test(val)) {
//                     setTableRows((ant) => [...ant, val])
//                 }



//             })
//             await sendMail()
//         } else {
//             alert("Please upload a valid Word document.");
//         }

//     };


    // const sendMail = async (htmlContent) => {


    //     for (let index = 0; index < values.length; index++) {
    //         const element = values[index];

            // const response = await fetch('/api/sendEmail', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     // 'castanedasantos@gmail.com'
            //     body: JSON.stringify({
            //         // 'castanedasantos@gmail.com'
            //         listaEmail: element,
            //         htmlContenido: htmlContent,
            //         titulo: '¡Tu proximo trabajo esta cerca en RE/MAX NOA!'
            //     })
            // })

    //     }


//         return "Enviado correctamente"
//     }


//     const changeHandler = (event) => {
//         importExcel(event)
//     };

//     return (

//         <Card className="w-full max-w-md mx-auto">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-center">Envío Masivo de Correos</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                     <Label htmlFor="file-upload">Archivo de Correos</Label>
//                     <div className="flex items-center space-x-2">
//                         <Input
//                             id="file-upload"
//                             type="file"
//                             accept=".xls, .csv"
//                             onChange={changeHandler}
//                             className="hidden"
//                         />
//                         <Button
//                             onClick={() => document.getElementById('file-upload')?.click()}
//                             variant="outline"
//                             className="w-full"
//                         >
//                             <Upload className="mr-2 h-4 w-4" /> Subir Archivo
//                         </Button>
//                         {file && <span className="text-sm text-muted-foreground">{file.name}</span>}
//                     </div>
//                 </div>
//                 <div className="space-y-2">
//                     <Label htmlFor="objetivo">Objetivo de la Campaña</Label>
//                     <Select onValueChange={setObjetivo}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Selecciona un objetivo" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="Captacion">Captación</SelectItem>
//                             <SelectItem value="Fidelización">Fidelización</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </CardContent>
//             <CardFooter>
//                 <Button
//                     className="w-full flex justify-between"
//                     onClick={handleEnviar}
//                     disabled={(!file || !objetivo || values.length == 0)}
//                 >
//                     Enviar Campaña {values && <span className="text-sm "> {values.length} Contactos</span>}
//                 </Button>

//             </CardFooter>
//         </Card>

//     );
// }
