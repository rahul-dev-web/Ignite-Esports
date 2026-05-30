interface ErrorStateProps {

  title?: string;

  message?: string;
}

export default function ErrorState({

  title = "Unable to Load",

  message =
    "Something went wrong. Please try again later.",

}: ErrorStateProps) {

  return (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center

      py-20

      text-center
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        text-red-400
        mb-3
        "
      >
        {title}
      </h2>

      <p className="text-gray-400">

        {message}

      </p>

    </div>

  );
}