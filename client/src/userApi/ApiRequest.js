import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import { SetALLProduct, SetTotal } from "../redux/state-slice/product-slice";
import axios from "axios";
import toast from "react-hot-toast";

export async function GetProductList(pageNo, perPage, searchKey) {
  let URL = "/api/v1/ProductsList/" + pageNo + "/" + perPage + "/" + searchKey;
  store.dispatch(ShowLoader());
  try {
    const result = await axios.get(URL);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetALLProduct(result.data["data"][0]["Rows"]));
        store.dispatch(SetTotal(result.data["data"][0]["Total"][0]["count"]));
      } else {
        store.dispatch(SetALLProduct([]));
        store.dispatch(SetTotal(0));
        // Assuming ErrorToast is defined somewhere else
        toast.error("No Data Found");
      }
    } else {
      // Assuming ErrorToast is defined somewhere else
      toast.error("Something Went Wrong");
    }
  } catch (e) {
    // Assuming ErrorToast is defined somewhere else
    toast.error("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}
