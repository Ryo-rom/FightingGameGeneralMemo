import { initializeDB } from "@/services/storage/initializeDB";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";

export default function RootLayout() {
  return (
    <Suspense fallback={null}>
      <SQLiteProvider
        databaseName="fightMemo"
        onInit={initializeDB}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="setting" options={{ title: "Settings" }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
