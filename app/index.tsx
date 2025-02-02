import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { Button, Card, Text, List, FAB, useTheme, MD3Theme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Briefcase, Coffee, LogIn, LogOut, Plus } from 'lucide-react';
import React from 'react';

// Temporary interfaces - replace with your actual store types
interface WorkData {
  workDone: string;
  breakTime: string;
  formattedWorkEndTime?: string;
  formattedWorkLeft?: string;
  lastLogStatus: string | null;
  loading?: boolean;
}

interface Log {
  id: string;
  log_time: string;
  log_status: string;
}

interface TempStore {
  breaklogMode: boolean;
  workData: WorkData;
  logs: Log[];
  userData: {
    username?: string;
  };
}

// Temporary mock data - remove when connecting real store
const initialStore: TempStore = {
  breaklogMode: false,
  workData: {
    workDone: '--:--',
    breakTime: '--:--',
    lastLogStatus: null,
  },
  logs: [],
  userData: {},
};

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  // Temporary state - replace with useStore() when ready
  const [store, setStore] = useState<TempStore>(initialStore);
  const { breaklogMode, workData, logs, userData } = store;

  // Simulate loading - remove when using real data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStore({
        ...store,
        userData: { username: 'testuser' },
        workData: {
          ...store.workData,
          workDone: '08:30',
          breakTime: '01:15',
          formattedWorkEndTime: '5:30 PM',
          formattedWorkLeft: '02:15',
        },
        logs: [
          { id: '1', log_time: new Date().toISOString(), log_status: 'day start' },
          { id: '2', log_time: new Date().toISOString(), log_status: 'break' },
        ],
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const getMainActionLabel = () => {
    if (workData.lastLogStatus === null && !breaklogMode) return 'Start Day';
    if (workData.lastLogStatus === null && breaklogMode) return 'Take Break';
    if (workData.lastLogStatus === 'day start') return 'Take Break';
    if (workData.lastLogStatus === 'exit') return 'End Break';
    return 'Add Log';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          variant='titleLarge'
          style={[styles.dateHeader, { color: theme.colors.onSurface }]}>
          {currentDate}
        </Text>

        <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Card.Content style={styles.statsRow}>
            <StatItem
              label='Work Done'
              value={workData.workDone}
              theme={theme}
              loading={!userData.username}
            />
            <StatItem
              label='Break Time'
              value={workData.breakTime}
              theme={theme}
              loading={!userData.username}
            />
          </Card.Content>
        </Card>

        {!breaklogMode && (
          <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Card.Content style={styles.timeline}>
              <TimelineItem
                label='Work Until'
                value={workData.formattedWorkEndTime || '--:--'}
                theme={theme}
              />
              <TimelineItem
                label='Work Left'
                value={workData.formattedWorkLeft || '--:--'}
                theme={theme}
              />
            </Card.Content>
          </Card>
        )}

        <List.Accordion
          title='Work Logs'
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          style={{ backgroundColor: theme.colors.surfaceVariant }}
          left={(props) => (
            <List.Icon
              {...props}
              icon='clock'
            />
          )}>
          {logs.length === 0 ? (
            <List.Item
              title='No logs available'
              titleStyle={{ color: theme.colors.error }}
            />
          ) : (
            [...logs].reverse().map((log) => (
              <List.Item
                key={log.id}
                title={new Date(log.log_time).toLocaleTimeString()}
                description={log.log_status}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      log.log_status === 'day start'
                        ? 'briefcase'
                        : log.log_status === 'break'
                        ? 'coffee'
                        : 'clock'
                    }
                  />
                )}
                style={{ backgroundColor: theme.colors.surface }}
              />
            ))
          )}
        </List.Accordion>
      </ScrollView>

      <FAB
        label={getMainActionLabel()}
        icon={({ size, color }) => {
          if (workData.loading) return <ActivityIndicator color={color} />;
          return (
            <Briefcase
              size={size}
              color={color}
            />
          );
        }}
        onPress={() => console.log('Main action pressed')}
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.onPrimary}
      />
    </SafeAreaView>
  );
};

interface StatItemProps {
  label: string;
  value: string;
  theme: MD3Theme;
  loading?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, theme, loading }) => (
  <View style={styles.statItem}>
    {loading ? (
      <ActivityIndicator
        animating={true}
        color={theme.colors.onSurface}
      />
    ) : (
      <>
        <Text
          variant='labelMedium'
          style={{ color: theme.colors.onSurfaceVariant }}>
          {label}
        </Text>
        <Text
          variant='headlineMedium'
          style={{ color: theme.colors.onSurface }}>
          {value}
        </Text>
      </>
    )}
  </View>
);

interface TimelineItemProps {
  label: string;
  value: string;
  theme: MD3Theme;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ label, value, theme }) => (
  <View style={styles.timelineItem}>
    <Text
      variant='labelMedium'
      style={{ color: theme.colors.onSurfaceVariant }}>
      {label}
    </Text>
    <Text
      variant='titleMedium'
      style={{ color: theme.colors.onSurface }}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  dateHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  card: {
    borderRadius: 16,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});

export default HomeScreen;
