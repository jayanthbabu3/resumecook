import { useEffect, useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { migrateLocalStorageToFirestore, getMigrationStatus } from '@/lib/firestore/migration';

/**
 * Component that handles localStorage to Firestore migration
 * Runs once per user when they first log in
 */
export function MigrationHandler({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebaseAuth();
  const [migrationComplete, setMigrationComplete] = useState(false);

  useEffect(() => {
    const runMigration = async () => {
      // Only run if user is authenticated
      if (!user || loading) {
        setMigrationComplete(true);
        return;
      }

      // Check if migration already done
      const status = getMigrationStatus();
      if (status.completed) {
        setMigrationComplete(true);
        return;
      }

      // Run migration
      try {
        await migrateLocalStorageToFirestore();
      } catch (error) {
        console.error('Migration failed:', error);
      } finally {
        setMigrationComplete(true);
      }
    };

    runMigration();
  }, [user, loading]);

  // Don't block rendering - migration runs in background
  return <>{children}</>;
}
