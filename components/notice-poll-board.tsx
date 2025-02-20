"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "lucide-react";
import { useSession } from "next-auth/react";

export default function NoticePollBoard() {
  const { data: session } = useSession();

  const [notices, setNotices] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    expiresAt: "",
  });

  const [newPoll, setNewPoll] = useState({
    question: "",
    options: "",
    expiresAt: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [noticesRes, pollsRes] = await Promise.all([
        axios.get("/api/notices"),
        axios.get("/api/polls"),
      ]);

      setNotices(noticesRes.data);
      setPolls(pollsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function createNotice() {
    if (!session){ 
      console.warn("Session unavailable")
      return
    } ;
    try {
      setLoading(true);
      await axios.post("/api/notices", newNotice);
      setNewNotice({ title: "", description: "", expiresAt: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating notice:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createPoll() {
    try {
      setLoading(true);
      await axios.post("/api/polls", {
        ...newPoll,
        options: newPoll.options.split(","),
      });
      setNewPoll({ question: "", options: "", expiresAt: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating poll:", error);
    } finally {
      setLoading(false);
    }
  }

  async function vote(pollId: string, option: string) {
    try {
      await axios.put("/api/polls", { pollId, option });
      fetchData();
    } catch (error) {
      console.error("Error voting:", error);
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            Notice Board & Polls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notices" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="polls">Polls</TabsTrigger>
            </TabsList>

            {/* Notices Section */}
            <TabsContent value="notices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Notice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Title"
                    value={newNotice.title}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Description"
                    value={newNotice.description}
                    onChange={(e) =>
                      setNewNotice({
                        ...newNotice,
                        description: e.target.value,
                      })
                    }
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center gap-4">
                    <Input
                      type="date"
                      value={newNotice.expiresAt}
                      onChange={(e) =>
                        setNewNotice({ ...newNotice, expiresAt: e.target.value })
                      }
                    />
                    
                    <Button onClick={createNotice} disabled={loading}>
                      {loading ? "Posting..." : "Post Notice"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/*  Display Notices */}
              <div className="grid gap-4">
                {notices.map((notice: any) => (
                  <Alert key={notice.id}>
                    <AlertTitle className="text-lg font-semibold">
                      {notice.title}
                    </AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                      <p>{notice.description}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Expires on: {new Date(notice.expiresAt).toDateString()}
                      </p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </TabsContent>

            {/*  Polls Section */}
            <TabsContent value="polls" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Poll</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Question"
                    value={newPoll.question}
                    onChange={(e) =>
                      setNewPoll({ ...newPoll, question: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Options (comma ',' separated)"
                    value={newPoll.options}
                    onChange={(e) =>
                      setNewPoll({ ...newPoll, options: e.target.value })
                    }
                  />
                  <div className="flex items-center gap-4">
                    <Input
                      type="date"
                      value={newPoll.expiresAt}
                      onChange={(e) =>
                        setNewPoll({ ...newPoll, expiresAt: e.target.value })
                      }
                    />
                    <Button onClick={createPoll} disabled={loading}>
                      {loading ? "Creating..." : "Create Poll"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/*  Display Polls */}
              <div className="grid gap-4">
                {polls.map((poll: any) => (
                  <Card key={poll.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{poll.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        {poll.options.map((option: string, index: number) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => vote(poll.id, option)}
                          >
                            <span>{option}</span>
                            <span className="text-sm text-muted-foreground">
                              {poll.votes?.[option] || 0} votes
                            </span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
