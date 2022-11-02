import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { useEffect, useState } from "react";

const Index = () => {
  const [{ data }] = usePostsQuery();
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  console.log(data?.posts);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      {domLoaded && (
        <div>
          <NavBar />
          {!data ? (
            <div>Loading...</div>
          ) : (
            data.posts.map((p) => <div key={p.id}>{p.title}</div>)
          )}
        </div>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
