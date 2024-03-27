import { useEffect, useRef, useState } from "react";
import { Button, InputRef, Label, Select, Textarea } from "../../../../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { postAddress } from "../../../../../app/features/eduwork/edwAddressSlice";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const url = "https://www.emsifa.com/api-wilayah-indonesia/api";

const EdwAddressPost = () => {
  const { cred: user } = useSelector((state) => state.edwAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({});
  const [provinsiList, setProvinsiList] = useState([]);
  const [provinsiId, setProvinsiId] = useState("");
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kabupatenId, setKabupatenId] = useState("");
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kecamatanId, setKecamatanId] = useState("");
  const [kelurahanList, setKelurahanList] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value.split(",")[1] || e.target.value }));
    if (e.target.name === "provinsi") setProvinsiId(e.target?.value.split(",")[0]);
    if (e.target.name === "kabupaten") setKabupatenId(e.target?.value.split(",")[0]);
    if (e.target.name === "kecamatan") setKecamatanId(e.target?.value.split(",")[0]);
  };

  //   useEffect(() => {
  //     console.log("formdata", formData);
  //     console.log("provinsiid", provinsiId);
  //     console.log("kabupatenid", kabupatenId);
  //     console.log("kecamatanid", kecamatanId);
  //   }, [formData, provinsiId, kabupatenId, kecamatanId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postAddress({ data: formData, token: user?.signed }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res?.message, { variant: "success" });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err?.message, { variant: "error" });
      });
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    axios.get(`${url}/provinces.json`, { withCredentials: false }).then((res) => setProvinsiList(res.data));
  }, []);

  useEffect(() => {
    if (provinsiId) {
      axios.get(`${url}/regencies/${provinsiId}.json`, { withCredentials: false }).then((res) => setKabupatenList(res.data));
    } else setKabupatenList([]);
  }, [provinsiId]);
  useEffect(() => {
    if (kabupatenId) {
      axios
        .get(`${url}/districts/${kabupatenId}.json`, { withCredentials: false })
        .then((res) => setKecamatanList(res.data));
    } else setKecamatanList([]);
  }, [kabupatenId]);
  useEffect(() => {
    if (kecamatanId) {
      axios.get(`${url}/villages/${kecamatanId}.json`, { withCredentials: false }).then((res) => setKelurahanList(res.data));
    } else setKecamatanList([]);
  }, [kecamatanId]);

  const renderedProvinsi =
    provinsiList?.length &&
    provinsiList.map((p) => (
      <option key={p.id} value={[p.id, p.name]}>
        {p.name}
      </option>
    ));
  const renderedKabupaten =
    kabupatenList?.length > 0 &&
    kabupatenList.map((k) => (
      <option key={k.id} value={[k.id, k.name]}>
        {k.name}
      </option>
    ));
  const renderedKecamatan =
    kecamatanList?.length > 0 &&
    kecamatanList.map((k) => (
      <option key={k.id} value={[k.id, k.name]}>
        {k.name}
      </option>
    ));
  const renderedKelurahan =
    kelurahanList?.length > 0 &&
    kelurahanList.map((k) => (
      <option key={k.id} value={[k.id, k.name]}>
        {k.name}
      </option>
    ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label id="name">name</Label>
        <InputRef ref={nameRef} id="name" onChange={handleChange} placeholder="name" />
        <Label id="provinsi">provinsi</Label>
        <Select id="provinsi" onChange={handleChange}>
          <option value={["", ""]}>pilih provinsi</option>
          {renderedProvinsi}
        </Select>
        <Label id="kabupaten">kabupaten</Label>
        <Select id="kabupaten" onChange={handleChange}>
          <option value="">pilih kabupaten</option>
          {renderedKabupaten}
        </Select>
        <Label id="kecamatan">kecamatan</Label>
        <Select id="kecamatan" onChange={handleChange}>
          <option value="">pilih kecamatan</option>
          {renderedKecamatan}
        </Select>
        <Label id="kelurahan">kelurahan</Label>
        <Select id="kelurahan" onChange={handleChange}>
          <option value="">pilih kelurahan</option>
          {renderedKelurahan}
        </Select>
        <Label id="detail">detail</Label>
        <Textarea id="detail" onChange={handleChange} placeholder="detail" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EdwAddressPost;
