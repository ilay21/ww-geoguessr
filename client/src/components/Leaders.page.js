import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SCORES } from "../gql/queries/score.queries";

function LeadersPage() {
  const { loading, error, data } = useQuery(GET_ALL_SCORES, {
    variables: { allScoresCategory: "world" },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log(data);
  return <div>we got data</div>;
}

export default LeadersPage;
