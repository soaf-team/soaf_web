import { GenericForm } from "@/components";
import { useFunnel } from "@/hooks";
import { useState } from "react";
import { SearchMovieList } from "./SearchMovieList";
import { SetMovieInfo } from "./SetMovieInfo";

const STEP = ["영화 검색", "영화 등록"] as const;

export const RegisterMovieForm = () => {
  const [movieId, setMovieId] = useState("" as string);
  const { Funnel, Step, setStep } = useFunnel(STEP[0]);

  const handleNextStep = () => {
    setStep(STEP[1]);
  };

  const handlePrevStep = () => {
    setStep(STEP[0]);
  };

  const handleSubmit = () => {
    // TODO: Submit 로직
  };

  return (
    <GenericForm formOptions={{ mode: "onSubmit" }} onSubmit={handleSubmit}>
      <Funnel>
        <Step name={STEP[0]}>
          <SearchMovieList
            onNextStep={handleNextStep}
            setMovieId={setMovieId}
          />
        </Step>
        <Step name={STEP[1]}>
          <SetMovieInfo onPrevStep={handlePrevStep} movieId={movieId} />
        </Step>
      </Funnel>
    </GenericForm>
  );
};
