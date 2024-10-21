import { useState, useEffect } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { enviarMailMasivo } from "../action"
import { v2 as cloudinary } from "cloudinary";
import { emailOfrecerCorrejido } from "./emailOfrecerCorrejido"
import { Upload } from "lucide-react"
import * as XLSX from 'xlsx';
const { read, utils } = XLSX;
import { toast } from 'sonner';

cloudinary.config({
  cloud_name: "dlxwkq6bm",
  api_key: "312155376375165",
  api_secret: "OuD06O8Izb2EVH8rnWYr9Xjfeak",
});

const PropertySchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  url: z.string().url("La URL debe ser válida"),
  rooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Debe ser un número mayor que 0",
  }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Debe ser un número mayor que 0",
  }),
  coveredArea: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Debe ser un número mayor que 0",
  }),
  totalArea: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Debe ser un número mayor que 0",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Debe ser un número mayor que 0",
  }),
  image: z.instanceof(File, { message: "La imagen es requerida" }),
})

const initialPropertyData = {
  title: "",
  description: "",
  url: "",
  rooms: "",
  bathrooms: "",
  coveredArea: "",
  totalArea: "",
  price: "",
  image: null,
}

export default function FormularioMailingOfrecer() {
  const [currentProperty, setCurrentProperty] = useState(1)
  const [property1, setProperty1] = useState(initialPropertyData)
  const [tableData, setTableData] = useState()
  const [tableRows, setTableRows] = useState([]);
  const [property2, setProperty2] = useState(initialPropertyData)
  const [property3, setProperty3] = useState(null)
  const [errors1, setErrors1] = useState({})
  const [errors2, setErrors2] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [file, setFile] = useState(null)
  const expt = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')

  const [values, setValues] = useState([]);


  const validateProperty = (property) => {
    try {
      PropertySchema.parse(property)
      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.formErrors.fieldErrors
      }
      return {}
    }
  }

  useEffect(() => {
    const errors1 = validateProperty(property1)
    const errors2 = validateProperty(property2)
    setErrors1(errors1)
    setErrors2(errors2)
    setIsFormValid(
      Object.keys(errors1).length === 0 &&
      Object.keys(errors2).length === 0 &&
      property3 !== null
    )
  }, [property1, property2, property3])

  const handleChange = (field, value) => {
    if (currentProperty === 1) {
      setProperty1({ ...property1, [field]: value })
    } else if (currentProperty === 2) {
      setProperty2({ ...property2, [field]: value })
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    handleChange('image', file)
  }

  const handleExcelUpload = (event) => {
    const file = event.target.files[0]
    setProperty3(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFormValid) {
      console.log("Propiedad 1:", property1)
      console.log("Propiedad 2:", property2)
      console.log("Propiedad 3 (Excel):", property3)

      const propiedad2 = {
        title2: '1',
        description2: '2',
        url2: '3',
        rooms2: '4',
        bathrooms2: "5",
        coveredArea2: "3",
        totalArea2: "1",
        price2: "2",
        image2: new Object()
      };

      const propiedad1 = {
        title1: '1',
        description1: '2',
        url1: '3',
        rooms1: '4',
        bathrooms1: "5",
        coveredArea1: "3",
        totalArea1: "1",
        price1: "2",
        image1: new Object()
      };



      for (const item in property1) {

        propiedad1[`${item}1`] = property1[item]

      }



      for (const item in property2) {

        propiedad2[`${item}2`] = property2[item]

      }

      const bytes = await propiedad2.image2.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result2 = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) reject(err);

            resolve(result);
          })
          .end(buffer);
      });

      const bytes2 = await property1.image.arrayBuffer();
      const buffer2 = Buffer.from(bytes2);

      const result1 = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) reject(err);

            resolve(result);
          })
          .end(buffer2);
      });

      propiedad1['image1'] = result1.secure_url
      propiedad2['image2'] = result2.secure_url

      if (propiedad1['rooms1'] == '1') {
        propiedad1['rooms1'] = "1 Habitación"
      } else if (propiedad1['rooms1'] != '1') {
        propiedad1['rooms1'] = `${propiedad1['rooms1']} Habitaciones`
      }

      if (propiedad2['rooms2'] == '1') {
        propiedad2['rooms2'] = "1 Habitación"
      } else if (propiedad2['rooms2'] != '1') {
        propiedad2['rooms2'] = `${propiedad2['rooms2']} Habitaciones`
      }

      if (propiedad1['bathrooms1'] == '1') {
        propiedad1['bathrooms1'] = "1 Baño"
      } else if (propiedad1['bathrooms1'] != '1') {
        propiedad1['bathrooms1'] = `${propiedad1['bathrooms1']} Baños`
      }

      if (propiedad2['bathrooms2'] == '1') {
        propiedad2['bathrooms2'] = "1 Baño"
      } else if (propiedad2['bathrooms2'] != '1') {
        propiedad2['bathrooms2'] = `${propiedad2['bathrooms2']} Baños`
      }

      console.log({ ...propiedad1, ...propiedad2 });

      const result = await sendMail(emailOfrecerCorrejido({ ...propiedad1, ...propiedad2 }))

      setValues([])

      if (result.message == "Email Masivo enviado exitosamente!") {
        toast.success(result.message)
      }

    } else {
      console.log("El formulario contiene errores o faltan datos. Por favor, complete todos los campos antes de enviar.")
    }
  }


  const changeHandler = (event) => {
    const file = event.target.files[0]
    setProperty3(file)
    importExcel(event)
  };

  const convertToJson = async (headers, data) => {
    const rows = []
    setValues([])
    data.forEach(async row => {
      let rowData = {}
      row.forEach(async (element, index) => {
        rowData[headers[index]] = element;
      })
      // console.log("rowData--->", rowData)

      Object.entries(rowData).forEach(([key, value]) => {

        if (expt.test(value)) {
          setValues((ant) => [...ant, value])
        }

        // if (key == "Nombre Empleado") {
        //     listaCaptacion.push(value)
        //     console.log(value);
        // }
      })
      rows.push(rowData)
    });
    setTableData(rows)
    // await sendMail()
    return rows
  }
  const importExcel = (e) => {
    const file = e.target.files[0]
    setFile(e.target.files[0])
    const reader = new FileReader()
    reader.onload = (event) => {
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      const headers = fileData[0]

      const heads = headers.map(head => ({ title: head, field: head }))
      fileData.splice(0, 1)
      convertToJson(headers, fileData)
    }
    reader.readAsBinaryString(file)
  }


  const sendMail = async (htmlContent) => {


    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        listaEmail: ['carlos.facundo.rr@gmail.com'],
        htmlContenido: htmlContent
      })
    })
    return await response.json()
  }

  const toggleProperty = () => {
    setCurrentProperty((prev) => {
      if (prev === 1) return 2
      if (prev === 2) return 3
      return 1
    })
  }

  const currentData = currentProperty === 1 ? property1 : property2
  const currentErrors = currentProperty === 1 ? errors1 : errors2

  const renderPropertySummary = (property, title) => (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p>Título: {property.title}</p>
      <p>Descripción: {property.description}</p>
      <p>URL: {property.url}</p>
      <p>Habitaciones: {property.rooms}</p>
      <p>Baños: {property.bathrooms}</p>
      <p>Área cubierta: {property.coveredArea} m²</p>
      <p>Área total: {property.totalArea} m²</p>
      <p>Precio: ${property.price}</p>
      <p>Imagen: {property.image ? property.image.name : 'No seleccionada'}</p>
    </div>
  )

  const renderInput = (field, label, type = "text") => (
    <div className="grid gap-2">
      <Label htmlFor={field}>{label}</Label>
      {field === "description" ? (
        <Textarea
          id={field}
          value={currentData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className={currentErrors[field] ? "border-red-500" : ""}
          required
        />
      ) : field === "image" ? (
        <div>
          <Input
            id={field}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={currentErrors[field] ? "border-red-500" : ""}
            required
          />
          {currentData.image && (
            <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {currentData.image.name}</p>
          )}
        </div>
      ) : (
        <Input
          id={field}
          type={type}
          value={currentData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className={currentErrors[field] ? "border-red-500" : ""}
          required
        />
      )}
      {currentErrors[field] && (
        <p className="text-red-500 text-sm">{currentErrors[field]?.[0]}</p>
      )}
    </div>
  )

  const renderPropertyForm = () => {
    if (currentProperty === 3) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Archivo De Contactos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {/* <div className="space-y-2">
                <Label htmlFor="file-upload">Archivo de Correos</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="excelFile"
                    type="file"
                    accept=".xls, .csv"
                    onChange={changeHandler}
                    className="hidden"
                  />
                  <Button
                    onClick={() => document.getElementById('excelFile')?.click()}
                    variant="outline"
                    className="w-full"s
                  >
                    <Upload className="mr-2 h-4 w-4" /> Subir Archivo
                  </Button>
                  {file && <span className="text-sm text-muted-foreground">{file.name}</span>}
                </div>
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="excelFile">Archivo Excel</Label>
                <Input
                  id="excelFile"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={changeHandler}
                  required
                />
                {property3 && (
                  <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {property3.name}</p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button type="button" onClick={toggleProperty}>
                  Volver a Propiedad 1
                </Button>
                <Button type="submit" disabled={!isFormValid}>
                  Enviar a -{values && <span className="text-sm ">{values.length} Contactos</span>}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Propiedad {currentProperty}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderInput("title", "Título")}
          {renderInput("description", "Descripción")}
          {renderInput("url", "URL de la propiedad", "url")}
          <div className="grid grid-cols-2 gap-4">
            {renderInput("rooms", "Habitaciones", "number")}
            {renderInput("bathrooms", "Baños", "number")}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderInput("coveredArea", "Metros cuadrados cubiertos", "number")}
            {renderInput("totalArea", "Metros cuadrados totales", "number")}
          </div>
          {renderInput("price", "Precio", "number")}
          {renderInput("image", "Imagen de la propiedad")}
          <div className="flex justify-between items-center">
            <Button type="button" onClick={toggleProperty}>
              {currentProperty === 1 ? "Siguiente Propiedad" : "Propiedad 3"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Formulario de Propiedades</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Progress value={currentProperty === 1 ? 33 : currentProperty === 2 ? 66 : 100} className="mb-4" />
        {renderPropertyForm()}
      </form>
      {/* 
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumen de Propiedades</CardTitle>
        </CardHeader>
        <CardContent>
          {renderPropertySummary(property1, "Propiedad 1")}
          {renderPropertySummary(property2, "Propiedad 2")}
          <div className="mt-4">
            <h3 className="font-semibold">Propiedad 3 (Excel)</h3>
            <p>{property3 ? property3.name : 'No seleccionado'}</p>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}