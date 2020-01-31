import { useEffect, useState } from "react";
import { instance } from "../service/settings";
import { useAppState } from "../store/app-state";

export default function(page, reset) {
  const [, dispatch] = useAppState();

  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    instance.get(`/users?page=${reset ? 1 : page}&count=6`).then(result => {
      dispatch({ type: "SET_USERS", users: result.data.users });
      setButtonState(result.data.total_pages === page ? false : true);
    });
  }, [dispatch, page, reset]);

  return buttonState;
}
