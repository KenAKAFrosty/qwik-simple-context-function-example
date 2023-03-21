import {
  component$,
  createContextId,
  type QRL,
  Slot,
  useContextProvider,
  useStore,
  $,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";


export const ExampleContext = createContextId<{
  someSortOfFunction: QRL<(text: string, value: number) => Promise<string>>;
}>("example-context");

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const example = useStore({
    someSortOfFunction: $(async (text: string, value: number) => {
      //I arbitrarily made this async to match your likely use case of needing to actually await something useful
      return text + " " + value;
    }),
  });
  useContextProvider(ExampleContext, example);

  return (
    <div class="page">
      <main>
        <Header />
        <Slot />
      </main>
      <div class="section dark">
        <div class="container">
          <Footer />
        </div>
      </div>
    </div>
  );
});
